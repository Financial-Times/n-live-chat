/**
 * @jest-environment jsdom
 */
import { LiveChat, LiveChatInline, LiveChatPopup } from "./browser";

describe("LiveChat", () => {
    let liveChat: LiveChat;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="liveAgent"
      data-deployment-id="1"
      data-organisation-id="1"
      data-button-reference="1"
      data-host="1">
        <div id="liveAgentButton"></div>
        <div id="liveAgentOnlineIndicator"></div>
        <div id="liveAgentOfflineIndicator"></div>
      </div>
    `;
        liveChat = new LiveChat();
    });

    it("should initialize LiveChat with correct configuration", () => {
        expect(liveChat.config.deploymentId).toBe("1");
        expect(liveChat.config.organisationId).toBe("1");
        expect(liveChat.config.buttonReference).toBe("1");
        expect(liveChat.config.host).toBe("1");
    });

    it("should initialize LiveChat with correct DOM elements", () => {
        expect(liveChat.container).toBeDefined();
        expect(liveChat.button).toBeDefined();
        expect(liveChat.onlineIndicator).toBeDefined();
        expect(liveChat.offlineIndicator).toBeDefined();
    });

    it("should initialize LiveChat with correct Flags", () => {
        expect(liveChat.flags).toBeDefined();
    });

    it("should initialize LiveChat with correct callbacks and options", () => {
        const initializer = liveChat.initializer();
        expect(typeof initializer).toBe("function");
        expect(initializer()).toBeUndefined();
    });
});

describe("LiveChatInline", () => {
    let liveChatInline: LiveChatInline;

    beforeEach(() => {
        document.body.innerHTML = `
          <div id="liveAgent"
          data-deployment-id="1"
          data-organisation-id="1"
          data-button-reference="1"
          data-host="1">
            <div id="liveAgentInline"></div>
            <div id="liveAgentButton"></div>
            <div id="liveAgentOnlineIndicator"></div>
            <div id="liveAgentOfflineIndicator"></div>
          </div>
        `;
        liveChatInline = new LiveChatInline();
    });

    it("should initialize LiveChatInline with correct DOM element", () => {
        expect(liveChatInline.inline).toBeDefined();
    });

    it("should initialize LiveChatInline with correct callbacks and options", () => {
        const initializer = liveChatInline.initializer();
        expect(typeof initializer).toBe("function");
        expect(initializer()).toBeUndefined();
    });
});

describe("LiveChatPopup", () => {
    let liveChatPopup: LiveChatPopup;
    beforeEach(() => {
        document.body.innerHTML = `
          <div id="liveAgent"
          data-deployment-id="1"
          data-organisation-id="1"
          data-button-reference="1"
          data-host="1">
            <div id="liveAgentPopup">
                <button id="liveAgentButtonClose"></button>
            </div>
            <div id="liveAgentButton"></div>
            <div id="liveAgentOnlineIndicator"></div>
            <div id="liveAgentOfflineIndicator"></div>
          </div>
        `;
        liveChatPopup = new LiveChatPopup();
    });

    it("should initialize LiveChatPopup with correct DOM elements", () => {
        expect(liveChatPopup.popup).toBeDefined();
        expect(liveChatPopup.closeButton).toBeDefined();
    });

    it("should initialize LiveChatPopup with correct callbacks and options", () => {
        const initializer = liveChatPopup.initializer();
        expect(typeof initializer).toBe("function");
        expect(initializer()).toBeUndefined();
    });
});
