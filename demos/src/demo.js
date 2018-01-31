import { LiveChatInline, LiveChatPopup } from '../../dist/main.js';

if(document.querySelector('[data-live-chat-style="inline"]')) {
	new LiveChatInline().init();
} else if(document.querySelector('[data-live-chat-style="popup"]')) {
	new LiveChatPopup().init();
}
