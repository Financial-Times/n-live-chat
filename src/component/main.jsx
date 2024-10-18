import React from 'react';
import PropTypes from 'prop-types';

const PopUpLiveChat = () => {
	return (
		<div id="liveAgentPopup" className="n-sliding-popup n-live-agent__popup" data-n-component="n-sliding-popup" data-n-sliding-popup-position="bottom right" aria-hidden="false">
			<div className="n-live-agent__popup-cta">
				Need help?
				<button id="liveAgentButton" className="n-live-agent__popup-button" data-trackable="livechat-openChatWindow">
					Start chat
				</button>
			</div>
			<button id="liveAgentButtonClose" className="n-live-agent__popup-button--close" data-n-component="n-sliding-popup-close" data-trackable="livechat-triggerClose">
				<span className="n-sliding-popup-close-label">Close help popup</span>
			</button>
		</div>
	)
}

const InlineLiveChat = () => {
	return (
		<div id="liveAgentInline" className="n-live-agent__inline" style={{ display: 'none' }}>
			<div>
				<p className="n-live-agent__inline-message">Have a question? Visit the <a href="https://help.ft.com">FT Help Centre</a> or chat to a customer advisor now.</p>
			</div>
			<button id="liveAgentButton" className="n-live-agent__inline-button" data-trackable="livechat-openChatWindow">
				Start chat
			</button>
		</div>
	)
}
const DEFAULT_STYLE = 'inline';

// The Live Chat component
// The props are the union of the old live chat and Project Felix live chat props
// old props: deploymentId, organisationId, buttonReference, host
// Project Felix props: scriptUrl, organisationId, embeddedDeploymentService,
//   embeddedServiceUrl, scrt2Url, chatOrigin
const LiveChat = ({
	liveChatProjectFelix = false,
	style = DEFAULT_STYLE,
	salesforceConfig = {},
}) => {
	const {
		deploymentId,
		organisationId,
		buttonReference,
		host,

		scriptUrl,
		embeddedDeploymentService,
		embeddedServiceUrl,
		scrt2Url,
		chatOrigin,
	} = salesforceConfig;
	return (
		<div
			id="liveAgent"
			data-live-chat-project-felix={liveChatProjectFelix}
			data-deployment-id={deploymentId}
			data-organisation-id={organisationId}
			data-button-reference={buttonReference}
			data-host={host}

			data-script-url={scriptUrl}
			data-embedded-deployment-service={embeddedDeploymentService}
			data-embedded-service-url={embeddedServiceUrl}
			data-scrt2-url={scrt2Url}
			data-chat-origin={chatOrigin}
		>
			{ style === DEFAULT_STYLE ? <InlineLiveChat /> : <PopUpLiveChat /> }
			<div id="liveAgentOnlineIndicator"></div>
			<div id="liveAgentOfflineIndicator"></div>
		</div>
	);
}

LiveChat.propTypes = {
	liveChatProjectFelix: PropTypes.bool,
	style: PropTypes.string,
	salesforceConfig: PropTypes.shape({
		deploymentId: PropTypes.string,
		organisationId: PropTypes.string.isRequired,
		buttonReference: PropTypes.string,
		host: PropTypes.string,

		scriptUrl: PropTypes.string,
		chatOrigin: PropTypes.string,
		embeddedDeploymentService: PropTypes.string,
		embeddedServiceUrl: PropTypes.string,
		scrt2URL: PropTypes.string,
	})
};

export default LiveChat;
