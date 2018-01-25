declare let liveagent: any;
declare let _laq: any;

interface SalesforceConfig extends DOMStringMap {
	delpoymentId: string;
	organisationId: string;
	buttonReference: string;
	host: string;
}

export default class LiveChat {
	config: SalesforceConfig;
	container: HTMLElement;
	button: HTMLElement;
	closeButton?: HTMLElement;
	onlineIndicator: HTMLElement;
	offlineIndicator: HTMLElement;

    constructor(style: string) {
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

}
