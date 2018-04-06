declare let liveagent: any;
declare global {
	interface Window {
		_laq: any;
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
}

class LiveChat {
	config: SalesforceConfig;
	container: HTMLElement;
	button: HTMLElement;
	onlineIndicator: HTMLElement;
	offlineIndicator: HTMLElement;

    constructor() {
		this.container = document.getElementById('liveAgent') as HTMLDivElement;
		this.button = document.getElementById('liveAgentButton') as HTMLButtonElement;
		this.onlineIndicator = document.getElementById('liveAgentOnlineIndicator') as HTMLDivElement;
		this.offlineIndicator = document.getElementById('liveAgentOfflineIndicator') as HTMLDivElement;
		this.config = this.container.dataset as SalesforceConfig;

		window._laq = window._laq || [];
		window._laq.push(() => {
			liveagent.showWhenOnline(this.config.buttonReference, this.onlineIndicator);
			liveagent.showWhenOffline(this.config.buttonReference, this.offlineIndicator);
		});
	}

	initializer(onInit?: Function) : Function {
		return (callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null) : void => {
			let script: HTMLScriptElement = document.createElement('script');
			script.src = `${this.config.host}/content/g/js/41.0/deployment.js`;
			script.onload = () => {
				// third party initialisation (SalesForce)
				liveagent.init(
					`${this.config.host}/chat`,
					this.config.deploymentId,
					this.config.organisationId
				);

				const { demoMode = false, displayDelay = 1000 } = options || {};

				const initLiveChat: Function = () : void => {
					const online: boolean = this.offlineIndicator.style.display === 'none';
					if (online || demoMode === 'online') {
						// callback if an agent is online
						if(callbacks && callbacks.online) {
							callbacks.online();
						}
						// initializer callback
						if(onInit) {
							onInit();
						}
						this.button.onclick = () => {
							liveagent.startChat(this.config.buttonReference);
							// callback if the user clicks the start chat button
							if(callbacks && callbacks.open) {
								callbacks.open();
							}
						};
					} else {
						// callback if all agents are offline
						if(callbacks && callbacks.offline) {
							callbacks.offline();
						}
					}
				};
				setTimeout(initLiveChat, displayDelay > 1000 ? displayDelay : 1000);
			};
			document.head.appendChild(script);
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
	init(callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null) : void {
		this.initializer(() => {
			this.popup.setAttribute('data-n-sliding-popup-visible', 'true');
			this.closeButton.onclick = () => {
				this.popup.removeAttribute('data-n-sliding-popup-visible');
				// callback on dismissing the popup
				if(callbacks && callbacks.dismiss) {
					callbacks.dismiss();
				}
			};
		})(callbacks, options);
	}
}

export class LiveChatInline extends LiveChat {
	// clients should wrap LiveChatInline.init() in try - catch blocks
	init(callbacks?: LiveChatCallbacks | null, options?: LiveChatOptions | null) : void {
		this.initializer()(callbacks, options);
	}
}
