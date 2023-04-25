
This used to be an origami component, but has always been denoted as "experimental". In April 2023 we did an inventory of the repos we own and we talked to the Origami team about this becoming an official component. However, this wasn't possible due to the first question of the process: "is it going to be used in more than one place". n-sliding-popup was only used by n-live-chat (which at the time of writing is used in next-profile, next-retention, and next-subscribe). The consensus was that we should move n-sliding-popup into n-live-chat to reduce the number of repos we need to maintain. You can find the original repo at https://github.com/Financial-Times/n-sliding-popup.

The sliding popup is designed to allow a wrapped component to slide up from the bottom of the page when triggered, providing an interactive user experience
----

## Usage

Create a div that looks like this:

```html
<div class="n-sliding-popup" data-n-component="n-sliding-popup" data-n-sliding-popup-position="bottom right">
</div>
```

You can also create an instance of this with the following:

```js
new SlidingPopup('#some-el-which-is-a-sliding-popup');
```

### Opening the Popup

If you have a `SlidingPopup` instance, you can call `.open()` on the instance:

```js
sp = new SlidingPopup('#some-el-which-is-a-sliding-popup');
sp.open();
```

If you do not, then you'll need to set the `data-n-sliding-popup-visible`
attribute manually:

```js
el = document.querySelector('#some-el-which-is-a-sliding-popup');
el.setAttribute('data-n-sliding-popup-visible', 'true');
```

### Closing the Popup

You can add a close button by making a sub-element with `data-n-component="n-sliding-popup-close"`:

```html
<div class="n-sliding-popup" data-n-component="n-sliding-popup" data-n-sliding-popup-position="bottom right">
  <button class="n-sliding-popup-close" data-n-component="n-sliding-popup-close">
    <span class="n-sliding-popup-close-label">Close</span>
  </button>
</div>
```

This will Just Work™ and close the popup on click. Again, the button must have
`data-n-component="n-sliding-popup-close"` for functionality. Be sure to add the
`n-sliding-popup-close` class for the CSS styles. `n-sliding-popup-close-label`
can be used to style text that is visible only to screen readers.

If you want your own button, then it should use `SlidingPopup#close`, for example:

```js
sp = new SlidingPopup('#some-el-which-is-a-sliding-popup');
sp.close();
```

You can also simply remove the `data-n-sliding-popup-visible` attribute - but
this will not fire the additional event handlers described below...

### Doing things on Close

There are 3 ways to add handlers for closing. You can simply add the old-school
`onClose` attribute to the element:

```js
el = document.querySelector('#some-el-which-is-a-sliding-popup');
el.onClose = (event) => {
  event.detail.target === el;
  event.detail.instance instanceof SlidingPopup;
};
```

`onClose` can also be set on the SlidingPopup el:

```js
sp = new SlidingPopup('#some-el-which-is-a-sliding-popup');
sp.onClose = (event) => {
  event.detail.instance === sp;
  event.detail.target === sp.el;
};
```

Of course the "proper" way to do this is with event listeners, like you would
normal DOM elements. Just listen for the "close" event on the main component:

```js
el = document.querySelector('#some-el-which-is-a-sliding-popup');
el.addEventListener('close', (event) => {
  event.detail.target === el;
  event.detail.instance instanceof SlidingPopup;
});
```
