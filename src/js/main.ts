declare let liveagent: any;
declare let _laq: any;

interface SalesforceConfig extends DOMStringMap {
	delpoymentId: string;
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

export default class LiveChat {
	config: SalesforceConfig;
	container: HTMLElement;
	button: HTMLElement;
	closeButton?: HTMLElement;
	onlineIndicator: HTMLElement;
	offlineIndicator: HTMLElement;

    constructor(public style = 'popup') {
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
	}
}
