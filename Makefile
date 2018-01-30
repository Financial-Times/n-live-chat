node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

IGNORE_A11Y = true;

build:
	tsc

build-scss:
	rm -rf $$TARGET
	node-sass $$SOURCE $$TARGET --include-path bower_components --include-path node_modules/@financial-times

demo: build-scss SOURCE=demos/main.scss TARGET=demos/main.css
	node demos/demo.js
