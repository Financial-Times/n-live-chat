import { LiveChatInline, LiveChatPopup } from '../../src/js/main';

if(document.querySelector('[data-live-chat-style="inline"]')) {
	new LiveChatInline().init(null, { demoMode: 'online' });
} else if(document.querySelector('[data-live-chat-style="popup"]')) {
	new LiveChatPopup().init(null, { demoMode: 'online' });
}
