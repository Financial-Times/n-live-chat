import { LiveChatInline, LiveChatPopup } from '../../dist/main.js';

if(document.querySelector('[data-live-chat-style="inline"]')) {
	new LiveChatInline().init(null, { demoMode: 'online' });
} else if(document.querySelector('[data-live-chat-style="popup"]')) {
	new LiveChatPopup().init(null, { demoMode: 'online' });
}