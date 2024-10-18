import * as pageKitFlags from '@financial-times/dotcom-ui-flags';
import {Flags} from "@financial-times/dotcom-ui-flags/src/client";
declare let liveagent: any;
declare global {
	interface Window {
		_laq: any;
		embeddedservice_bootstrap: any;
	}
}
interface SalesforceConfig extends DOMStringMap {
	deploymentId: string;
	organisationId: string;
	buttonReference: string;
	host: string;
}

interface LiveChatCallbacks {
	online?: Function;
	offline?: Function;
	open?: Function;
	dismiss?: Function;
}

interface LiveChatOptions {
	displayDelay?: number;
	demoMode?: string;
	chatterBox?: boolean;
	liveChatURL: string;
}

export class LiveChat {
	config: SalesforceConfig;
	container: HTMLElement;
	button: HTMLElement;
	onlineIndicator: HTMLElement;
	offlineIndicator: HTMLElement;
	flags: Flags;

	constructor() {
		this.container = document.getElementById('liveAgent') as HTMLDivElement;
		this.button = document.getElementById('liveAgentButton') as HTMLButtonElement;
		this.onlineIndicator = document.getElementById('liveAgentOnlineIndicator') as HTMLDivElement;
		this.offlineIndicator = document.getElementById('liveAgentOfflineIndicator') as HTMLDivElement;
		this.config = this.container.dataset as SalesforceConfig;
		// @ts-ignore
		this.flags = pageKitFlags?.init ? pageKitFlags.init() : null;


		window._laq = window._laq || [];
		window._laq.push(() => {
			liveagent.showWhenOnline(this.config.buttonReference, this.onlineIndicator);
			liveagent.showWhenOffline(this.config.buttonReference, this.offlineIndicator);
		});
	}

	insertLiveAgentScript(
		onInit?: Function,
		callbacks?: LiveChatCallbacks | null,
		options?: LiveChatOptions | null
	): void {
		const initLiveAgent: Function = (): void => {
			liveagent.init(
				`${this.config.host}/chat`,
				this.config.deploymentId,
				this.config.organisationId
			);
		};

		const initLiveChat: Function = (): void => {
			const online: boolean = this.offlineIndicator.style.display === 'none' || options?.demoMode === 'online';
			if (online) {
				// callback if an agent is online
				if (callbacks && callbacks.online) {
					callbacks.online();
				}
				// initializer callback
				if (onInit) {
					onInit(online);
				}
				this.button.onclick = () => {
					if (options?.chatterBox) {
						const LIVE_CHAT_STAGING_HOST = 'https://ip-chatterbox-client-staging.herokuapp.com';
						const LIVE_CHAT_PROD_HOST = 'https://live-chat.ft.com';
						const baseUrl: string = this.flags.get('liveChatStaging') ? LIVE_CHAT_STAGING_HOST : LIVE_CHAT_PROD_HOST;
						const url: string = `${baseUrl}/${this.config.buttonReference}/${this.config.deploymentId}`;
						window.open(url, 'FT Live Chat', 'height=474px, width=467px')
					} else {
						liveagent.startChat(this.config.buttonReference);
					}
					// callback if the user clicks the start chat button
					if (callbacks && callbacks.open) {
						callbacks.open();
					}
				};
			} else {
				// callback if all agents are offline
				if (callbacks && callbacks.offline) {
					callbacks.offline();
				}
			}
		};

		const script: HTMLScriptElement = document.createElement('script');
		script.src = `${this.config.host}/content/g/js/41.0/deployment.js`;
		script.onload = () => {
			initLiveAgent();
			setTimeout(initLiveChat, options?.displayDelay > 1000 ? options.displayDelay : 1000);
		};
		document.head.appendChild(script);
	}

	insertProjectFelixScript(
		onInit?: Function,
		callbacks?: LiveChatCallbacks | null,
		options?: LiveChatOptions | null
	): void {
		// initialize the script for the live chat
		// more details on https://financialtimes.atlassian.net/wiki/spaces/SF/pages/8578334753/CC+MIAW+Chat+Snippet#Chat-Origin-Configuration
		const initProjectFelixScript: Function = (): void => {
			try {
				// there is a limit of 100 characters for the hidden field values
				const chatOriginURL = window.location.toString().substring(0, 100);
				window.embeddedservice_bootstrap.settings.language = 'en_US';
				window.addEventListener('onEmbeddedMessagingReady', () => {
					window.embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({
						"source": "Customer Care",
						"chatOrigin": this.config.chatOrigin,
						"chatOriginURL": chatOriginURL
					});
				});

				window.embeddedservice_bootstrap.init(
					this.config.organisationId,
					this.config.embeddedDeploymentService,
					this.config.embeddedServiceUrl,
					{
						scrt2URL: this.config.scrt2Url
					}
				);
			} catch (error) {
				console.error('Failed to init script', error);
			}
		};

		// check if the script is loaded every second
		// if the embeddedservice_bootstrap is loaded into the window
		// initialize the script for the live chat
		const checkScriptLoaded = (callback: Function): void => {
			const interval = setInterval(() => {
				if (window.embeddedservice_bootstrap) {
					clearInterval(interval);
					callback();
				}
			}, options?.displayDelay > 1000 ? options.displayDelay : 1000);
		};

		const initLiveChat: Function = (): void => {
			const interval = setInterval(() => {
				const button = document.getElementById('embeddedMessagingConversationButton');

				if (button) {
					clearInterval(interval);

					// custom initializer callback from the child class
					// this allows custom actions to be performed once the live chat DOM is ready
					if (onInit) {
						onInit(button);
					}
					// custom callback triggers from the consuming app
					// there is no online/offline signals for the new live chat
					// so only open are available
					button.onclick = () => {
						if (callbacks?.open) {
							callbacks.open();
						}
					};

					const tooltip = document.createElement('div');
					tooltip.className = 'tooltip-help';

					const span = document.createElement('span');
					span.className = 'highlight-text';
					span.textContent = 'How can we help?';

					const closeButton = document.createElement('button');
					closeButton.className = 'chatbot__message__close';
					closeButton.ariaLabel = 'Close';
					closeButton.title = 'Close';
					closeButton.onclick = (e) => {
						e.preventDefault();
						e.stopPropagation();

						tooltip.style.display = 'none';
						return;
					};

					tooltip.appendChild(span);
					tooltip.append(' Chat with us now');
					tooltip.append(closeButton);

					// Append the tooltip to the button
					button.appendChild(tooltip);
				}
			});
		};

		const script: HTMLScriptElement = document.createElement('script');
		script.src = this.config.scriptUrl;
		script.onload = () => {
			checkScriptLoaded(initProjectFelixScript);
			initLiveChat();
		};
		document.head.appendChild(script);
	}

	initializer(onInit?: Function): Function {
		if(this.flags?.get('liveChat')) {
			return (callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null): void => {
				if (this.config.liveChatProjectFelix === "true") {
					this.insertProjectFelixScript(onInit, callbacks, options);
				} else {
					this.insertLiveAgentScript(onInit, callbacks, options);
				}
			}
		} else {
			return ()=>{}
		}
	}
}

export class LiveChatPopup extends LiveChat {
	popup: HTMLElement;
	closeButton: HTMLElement;

	constructor() {
		super();
		this.popup = document.getElementById('liveAgentPopup') as HTMLDivElement;
		this.closeButton = document.getElementById('liveAgentButtonClose') as HTMLButtonElement;
	}

	// clients should wrap LiveChatPopup.init() in try - catch blocks
	init(callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null): void {
		this.initializer((isOnline: boolean) => {
			isOnline && this.popup.setAttribute('data-n-sliding-popup-visible', 'true');
			this.closeButton.onclick = () => {
				this.popup.removeAttribute('data-n-sliding-popup-visible');
				this.popup.setAttribute('aria-hidden', 'true');

				// callback on dismissing the popup
				if (callbacks && callbacks.dismiss) {
					callbacks.dismiss();
				}
			};
		})(callbacks, options);
	}
}

export class LiveChatInline extends LiveChat {
	inline: HTMLElement;

	constructor() {
		super();
		this.inline = document.getElementById('liveAgentInline') as HTMLDivElement;
	}
	// clients should wrap LiveChatInline.init() in try - catch blocks
	init(callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null): void {
		this.initializer((isOnline: boolean) => {
			this.inline.style.display = isOnline ? 'block' : 'none';
		})(callbacks, options);
	}
}

export class LiveChatPopupProjectFelix extends LiveChat {
	inline: HTMLElement;

	constructor() {
		super();
	}
	// clients should wrap LiveChatInline.init() in try - catch blocks
	init(callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null): void {
		this.initializer(null)(callbacks, options);
	}
}

export class LiveChatInlineProjectFelix extends LiveChat {
	inline: HTMLElement;

	constructor() {
		super();
		this.inline = document.getElementById('liveAgentInline') as HTMLDivElement;
	}
	// clients should wrap LiveChatInline.init() in try - catch blocks
	init(callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null): void {
		this.initializer((conversationButton: HTMLButtonElement) => {
			this.inline.style.display = 'block';
			this.button.onclick = (e) => {
				e.preventDefault();
				e.stopPropagation();

				conversationButton?.click();
				return;
			};
		})(callbacks, options);
	}
}
