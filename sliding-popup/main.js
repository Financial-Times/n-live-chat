import SlidingPopup from './sliding-popup';

const constructAll = function() {
	const els = document.querySelectorAll('[data-n-component="n-sliding-popup"]');
	for(let i = 0; i < els.length; i+=1) {
		SlidingPopup.init(els[i]);
	}
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default SlidingPopup;
