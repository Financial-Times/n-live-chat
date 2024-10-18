# n-live-chat

Customer Services live chat component for FT.com

## Usage

### Installation

```sh
npm install -S @financial-times/n-live-chat
```

### JSX Component

```jsx
import LiveChat from '@financial-times/n-live-chat';

<LiveChat liveChatProjectFelix={liveChatProjectFelix} style='popup' salesforceConfig={configObject} />
<LiveChat liveChatProjectFelix={liveChatProjectFelix} style='inline' salesforceConfig={configObject} />
```

### Migration from Handlebars

With other ongoing work to move away from `n-ui` / `Handlebars` - this component from v3 no longer has any handlebars partials. If you require the handlebars template, please use the `v2` release.

However, you may be able to register a custom `Handlebars` helper if you're feeling more adventurous. Without any testing (caveat emptor) it could be something akin to:

```js
const React = require('react')
const ReactDOMServer = require('react-dom/server')
module.exports = function({ hash }) {
  const component = require(hash.component)
  const props = { ...this, ...hash }
  return ReactDOMServer.renderToString(
    React.createElement(component, props)
  )
}
```

```hbs
<div>{{{#jsx component="@financial-times/n-component-here" someprop="goeshere" }}}</div>
```

#### Salesforce configuration

```js
// config for the old script
const configObject = {
  deploymentId: "string",
  organisationId: "string",
  buttonReference: "string",
  host: "string"
};

// config for the new script (script for Project Felix)
const configObjectProjectFelix = {
  scriptUrl: "string",
  organisationId: "string",
  embeddedDeploymentService: "string",
  embeddedServiceUrl: "string",
  scrt2Url: "string",
  chatOrigin: "string"
}
```

[More details](https://financialtimes.atlassian.net/wiki/spaces/SF/pages/8578334753/CC+MIAW+Chat+Snippet#Chat-Origin-Configuration) on the config object for the new Salesforce script

### Styles

```scss
@import "@financial-times/n-live-chat/main";
```

#### Popup component

```scss
@include nLiveChatPopup();
```
![Popup chat component](https://user-images.githubusercontent.com/12828487/36374208-73719b28-1562-11e8-950d-3041898e2d3c.png)


#### Inline component

```scss
@include nLiveChatInline();
```
![Inline chat component](https://user-images.githubusercontent.com/12828487/36374209-7515f514-1562-11e8-915f-b07b009454f6.png)

#### Project Felix component

```scss
@include nLiveChatProjectFelix();
```
![Project Felix chat component](https://github.com/user-attachments/assets/26caf002-7826-4d11-8b88-5cd3a65cd263)


### Client-side initialisation

```js
import { LiveChatPopup, LiveChatInline } from '@financial-times/n-live-chat';
// basic setup for popup component (old) with no tracking
new LiveChatPopup().init();

// basic setup for inline component (old) with no tracking
new LiveChatInline().init();

// basic setup for popup component (Project Felix) with no tracking
new LiveChatPopupProjectFelix().init();

// basic setup for inline component (Project Felix) with no tracking
new LiveChatInlineProjectFelix().init();
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

### chatterBox Feature Flag
n-live-chat will connect to the latest Customer Care Live Chat app , when this feature flag is on. The apps consuming n-live-chat can enable this feature by passing in the flag state for chatterboxChat as an option to the init function call.

```js
const options = {
  chatterBox: flags.get(chatterboxChat)
};

new LiveChatPopup().init(null, options);
```

### Demos

```sh
npm run start
```

- [Inline component demo](http://localhost:5005/inline)(for the purpose of demo this uses the staging environment url)
- [Popup component demo](http://localhost:5005/popup) (for the purpose of demo this uses the prod environment url)
- [Inline component (Project Felix) demo](http://localhost:5005/project-felix-inline)
- [Popup component (Project Felix) demo](http://localhost:5005/project-felix-popup)

**Note**: At the time of writing the demos for Project Felix are not working. It is due to the CORS and CSP frame-ancestor settings on the SalesForce script. You may need to create a local HTTPS server with port 443 to mimic the behavior of `https://local.ft.com` for the demos to work.
