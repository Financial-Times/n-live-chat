import { LiveChatInline, LiveChatPopup } from '../../dist/browser';

if(document.querySelector('[data-live-chat-style="inline"]')) {
	new LiveChatInline().init(null, { demoMode: 'online', chatterBox: true, liveChatURL: 'https://ip-chatterbox-client-staging.herokuapp.com' });
} else if(document.querySelector('[data-live-chat-style="popup"]')) {
	new LiveChatPopup().init(null, { demoMode: 'online', chatterBox: true, liveChatURL: 'https://live-chat.ft.com' });
}
