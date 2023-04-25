import React from 'react';
import { Shell } from '@financial-times/dotcom-ui-shell';
import LiveChat from '../../dist/component';

const flags = {
	liveChat:true
}
export default ({ style, salesforceConfig }) => {
	return (
		<Shell siteTitle={`${style} livechat demo`} flags={flags}>
			<main data-live-chat-style={style}>
				<link rel="stylesheet" href="./main.css"/>
				<h1 className="demo-header">{style} live chat component</h1>
				<LiveChat style={style} salesforceConfig={salesforceConfig} />
				<script async defer src="./main.js"></script>
			</main>
		</Shell>
	)
}
