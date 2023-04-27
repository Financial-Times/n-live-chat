/**
 * A sliding popup component.
 */
class SlidingPopup {
	/**
	 * Creates a new SlidingPopup instance.
	 * @param {HTMLElement|string} el - The element or CSS selector to use as the popup.
	 */
	constructor(el) {
	  if (!el) {
		el = document.querySelector('[data-n-component="n-sliding-popup"]');
	  } else if (typeof el === 'string') {
		el = document.querySelector(el);
	  }
	  this.el = el;
	  this.isOpen = false;
	  el.classList.toggle('n-sliding-popup--active', true);
	  const close = el.querySelector('[data-n-component="n-sliding-popup-close"]');
	  if (close) {
		close.addEventListener('click', () => this.close());
	  }
	}
  
	/**
	 * Opens the popup.
	 */
	open() {
	  if (!this.isOpen) {
		this.el.setAttribute('data-n-sliding-popup-visible', 'true');
		this.isOpen = true;
	  }
	}
  
	/**
	 * Closes the popup.
	 */
	close() {
	  if (this.isOpen) {
		this.el.removeAttribute('data-n-sliding-popup-visible');
		const event = new CustomEvent('close', { detail: { target: this.el, instance: this }});
		this.el.dispatchEvent(event);
		this.isOpen = false;
	  }
	}
  
	/**
	 * Initializes a new SlidingPopup instance on the given element or selector.
	 * @param {HTMLElement|string} el - The element or CSS selector to use as the popup.
	 * @returns {SlidingPopup} A new SlidingPopup instance.
	 */
	static init(el) {
	  return new SlidingPopup(el);
	}
  }
  
  export default SlidingPopup;
