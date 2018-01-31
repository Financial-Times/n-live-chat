declare let liveagent: any;
declare let _laq: any;

interface SalesforceConfig extends DOMStringMap {
<<<<<<< HEAD
	delpoymentId: string;
=======
	deploymentId: string;
>>>>>>> 1b4c6339e76dd1bc325e518865f1d9d9d7bae11d
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
}

<<<<<<< HEAD
export default class LiveChat {
	config: SalesforceConfig;
	container: HTMLElement;
	button: HTMLElement;
	closeButton?: HTMLElement;
	onlineIndicator: HTMLElement;
	offlineIndicator: HTMLElement;

    constructor(public style = 'popup') {
=======
class LiveChat {
	config: SalesforceConfig;
	container: HTMLElement;
	button: HTMLElement;
	onlineIndicator: HTMLElement;
	offlineIndicator: HTMLElement;

    constructor() {
>>>>>>> 1b4c6339e76dd1bc325e518865f1d9d9d7bae11d
		this.container = document.getElementById('liveAgent') as HTMLDivElement;
		this.button = document.getElementById('liveAgentButton') as HTMLButtonElement;
		this.onlineIndicator = document.getElementById('liveAgentOnlineIndicator') as HTMLDivElement;
		this.offlineIndicator = document.getElementById('liveAgentOfflineIndicator') as HTMLDivElement;
		this.config = this.container.dataset as SalesforceConfig;
		
		if (!_laq) { 
			_laq = [];
		}

		_laq.push(() => {
			liveagent.showWhenOnline(this.config.buttonReference, this.onlineIndicator);
			liveagent.showWhenOffline(this.config.buttonReference, this.offlineIndicator);
		});
	}

<<<<<<< HEAD
	// clients should wrap LiveChat.init() in try - catch blocks
	init(callbacks?: LiveChatCallbacks, options?: LiveChatOptions) : void {
		let script: HTMLScriptElement = document.createElement('script');
		script.src = `${this.config.host}/content/g/js/41.0/deployment.js`;
		script.onload = () => {
			// third party initialisation (SalesForce)
			liveagent.init(
				`${this.config.host}/chat`, 
				this.config.delpoymentId, 
				this.config.organisationId
			);

			const initLiveChat: Function = () : void => {
				const online: boolean = this.offlineIndicator.style.display === 'none';
				if (online) {
					if(callbacks) {
						// callback if an agent is online
						if(callbacks.online) {
							callbacks.online();
						}
						// callback if the user clicks the start chat button
						this.button.onclick = () => {
							if(callbacks.open) {
								callbacks.open();
							}
						};
					}

					// popup handlers
					if(this.style === 'popup') {
						this.container.setAttribute('data-n-sliding-popup-visible', 'true');
						this.closeButton = document.getElementById('liveAgentButton') as HTMLButtonElement;
						this.closeButton.onclick = () => {
							this.container.removeAttribute('data-n-sliding-popup-visible');
							// callback on dismissing the popup
							if(callbacks && callbacks.dismiss) {
								callbacks.dismiss();
							}
						};
					}

				} else {
					// callback if all agents are offline
					if(callbacks && callbacks.offline) {
						callbacks.offline();
					}
				}
			};
		
			if(options && options.displayDelay && options.displayDelay > 0) {
				setTimeout(initLiveChat, options.displayDelay);
			} else {
				initLiveChat();
			}
		};
		document.head.appendChild(script);
=======
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

				const initLiveChat: Function = () : void => {
					const online: boolean = this.offlineIndicator.style.display === 'none';
					if (online) {
						if(callbacks) {
							// callback if an agent is online
							if(callbacks.online) {
								callbacks.online();
							}
							// callback if the user clicks the start chat button
							this.button.onclick = () => {
								if(callbacks.open) {
									callbacks.open();
								}
							};
						}
						// initializer callback
						if(onInit) {
							onInit();
						}
					} else {
						// callback if all agents are offline
						if(callbacks && callbacks.offline) {
							callbacks.offline();
						}
					}
				};

				if(options && options.displayDelay && options.displayDelay > 0) {
					setTimeout(initLiveChat, options.displayDelay);
				} else {
					initLiveChat();
				}
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
		this.closeButton = document.getElementById('liveAgentButton') as HTMLButtonElement;
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
>>>>>>> 1b4c6339e76dd1bc325e518865f1d9d9d7bae11d
	}
}
