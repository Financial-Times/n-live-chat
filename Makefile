node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

# contrast error in popup demo
IGNORE_A11Y = true; 

build:
	tsc

demo-build:
	rm -rf bower_components/n-live-chat
	mkdir bower_components/n-live-chat
	cp -r templates/ bower_components/n-live-chat/templates/
	node-sass demos/src/demo.scss public/main.css --include-path bower_components

demo: demo-build
	node demos/app.js

a11y: 
	node .pa11yci.js
	PA11Y=true node demos/app
