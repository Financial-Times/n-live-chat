/*global describe, it */

// import expect from 'expect.js';

import SlidingPopup from './sliding-popup';

describe("SlidingPopup", () => {
	let popup;

	beforeEach(() => {
		popup = new SlidingPopup();
	});

	afterEach(() => {
		popup.close();
	});

	it('should be defined', () => {
		expect(SlidingPopup).to.be.a('function');
	});

	it('should have a static init method', () => {
		expect(SlidingPopup.init).to.be.a('function');
	});

	it('should open when the open method is called', () => {
		popup.open();
		expect(popup.el.getAttribute('data-n-sliding-popup-visible')).to.equal('true');
	});

	it('should close when the close method is called', () => {
		popup.el.setAttribute('data-n-sliding-popup-visible', 'true');
		popup.close();
		expect(popup.el.getAttribute('data-n-sliding-popup-visible')).to.equal(null);
	});

	it('should dispatch a close event when the close method is called', () => {
		let eventDispatched = false;
		popup.el.addEventListener('close', () => {
			eventDispatched = true;
		});
		popup.close();
		expect(eventDispatched).to.equal(true);
	});

	it('should invoke the onClose callback when the close method is called', () => {
		let callbackInvoked = false;
		popup.el.onClose = () => {
			callbackInvoked = true;
		};
		popup.close();
		expect(callbackInvoked).to.equal(true);
	});

	it('should invoke the onClose callback on the instance when the close method is called', () => {
		let callbackInvoked = false;
		popup.onClose = () => {
			callbackInvoked = true;
		};
		popup.close();
		expect(callbackInvoked).to.equal(true);
	});
});
