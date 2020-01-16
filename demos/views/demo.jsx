import React from 'react';
import LiveChat from '../../component/main';

export default ({ style, salesforceConfig }) => {
	return (
		<main data-live-chat-style={style}>
			<link rel="stylesheet" href="./main.css"/>
			<h1 className="demo-header">{style} live chat component</h1>
			<LiveChat style={style} salesforceConfig={salesforceConfig} />
			<script async defer src="./main.js"></script>
		</main>
	)
}
