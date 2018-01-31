# n-live-chat

Customer Services live chat component for FT.com

## Usage

### Installation

```sh
npm install -S @financial-times/n-live-chat
bower install -S n-live-chat
```

### Handlebars template

```hbs
{{> n-live-chat/templates/liveagent style='popup' salesforceConfig=configObject}}
{{> n-live-chat/templates/liveagent style='inline' salesforceConfig=configObject}}
```

#### Salesforce configuration

```js
const configObject = {
  deploymentId: "string",
  organisationId: "string",
  buttonReference: "string",
  host: "string"
};
```

### Styles

```scss
@import "n-live-chat/main";
```

#### Popup component

```scss
@include nLiveChatPopup();
```

#### Inline component

```scss
@include nLiveChatInline();
```

### Client-side initialisation

```js
// basic setup for popup component with no tracking
new LiveChatPopup().init();

// basic setup for inline component with no tracking
new LiveChatInline().init();
```

```js
// specify one or more callbacks
// e.g. for custom tracking events
const callbacks = {
  online: () => {
    /* agent online, chat available */
  },
  offline: () => {
    /* agents offline, chat unavailable */
  },
  open: () => {
    /* user clicked button to open chat */
  },
  // popup mode:
  dismiss: () => {
    /* user clicked button to dismiss popup */
  }
};

const options = {
  // wait 10 seconds before initialising component
  // (defaults to 1 second)
  displayDelay: 10000
};

new LiveChatPopup().init(callbacks, options);
```

### Demos

```sh
make install .env demo
```

- [Inline component demo](http://localhost:5005/inline)
- [Popup component demo](http://localhost:5005/popup)
