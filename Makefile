node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	tsc

build-production: build

build-demo: build
	rm -rf bower_components/n-live-chat
	mkdir bower_components/n-live-chat
	cp -r templates/ bower_components/n-live-chat/templates/
	node-sass demos/src/demo.scss public/main.css --include-path bower_components
	webpack --config demos/webpack.config.js
	@$(DONE)

demo: build build-demo
	node dist/demos-app

a11y: 
	node .pa11yci.js
	PA11Y=true node dist/demos-app
