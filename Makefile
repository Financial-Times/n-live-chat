node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	rm -rf dist
	tsc --p tsconfig.json

build-production: build

build-demo:
	rm -rf public
	tsc --p demos/tsconfig.server.json
	tsc --p demos/tsconfig.client.json
	
	
	rm -rf bower_components/n-live-chat
	mkdir bower_components/n-live-chat
	webpack --config demos/webpack.config.js
	cp -r templates/ bower_components/n-live-chat/templates/
	node-sass demos/scss/demo.scss public/main.css --include-path bower_components
	@$(DONE)

demo: build .env build-demo
	node public/app

a11y: 
	node .pa11yci.js
	PA11Y=true node public/app
