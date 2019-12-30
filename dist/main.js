"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LiveChat {
    constructor() {
        this.container = document.getElementById('liveAgent');
        this.button = document.getElementById('liveAgentButton');
        this.onlineIndicator = document.getElementById('liveAgentOnlineIndicator');
        this.offlineIndicator = document.getElementById('liveAgentOfflineIndicator');
        this.config = this.container.dataset;
        window._laq = window._laq || [];
        window._laq.push(() => {
            liveagent.showWhenOnline(this.config.buttonReference, this.onlineIndicator);
            liveagent.showWhenOffline(this.config.buttonReference, this.offlineIndicator);
        });
    }
    initializer(onInit) {
        return (callbacks, options) => {
            let script = document.createElement('script');
            script.src = `${this.config.host}/content/g/js/41.0/deployment.js`;
            script.onload = () => {
                liveagent.init(`${this.config.host}/chat`, this.config.deploymentId, this.config.organisationId);
                const { demoMode = false, displayDelay = 1000 } = options || {};
                const initLiveChat = () => {
                    const online = this.offlineIndicator.style.display === 'none';
                    if (online || demoMode === 'online') {
                        if (callbacks && callbacks.online) {
                            callbacks.online();
                        }
                        if (onInit) {
                            onInit();
                        }
                        this.button.onclick = () => {
                            liveagent.startChat(this.config.buttonReference);
                            if (callbacks && callbacks.open) {
                                callbacks.open();
                            }
                        };
                    }
                    else {
                        if (callbacks && callbacks.offline) {
                            callbacks.offline();
                        }
                    }
                };
                setTimeout(initLiveChat, displayDelay > 1000 ? displayDelay : 1000);
            };
            document.head.appendChild(script);
        };
    }
}
class LiveChatPopup extends LiveChat {
    constructor() {
        super();
        this.popup = document.getElementById('liveAgentPopup');
        this.closeButton = document.getElementById('liveAgentButtonClose');
    }
    init(callbacks, options) {
        this.initializer(() => {
            this.popup.setAttribute('data-n-sliding-popup-visible', 'true');
            this.closeButton.onclick = () => {
                this.popup.removeAttribute('data-n-sliding-popup-visible');
                this.popup.setAttribute('aria-hidden', 'true');

                if (callbacks && callbacks.dismiss) {
                    callbacks.dismiss();
                }
            };
        })(callbacks, options);
    }
}
exports.LiveChatPopup = LiveChatPopup;
class LiveChatInline extends LiveChat {
    init(callbacks, options) {
        this.initializer()(callbacks, options);
    }
}
exports.LiveChatInline = LiveChatInline;
