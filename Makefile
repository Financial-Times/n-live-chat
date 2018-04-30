node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	# temp fix for bug in @types/node@10.0.0 - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25342
	npm i --save-dev @types/node@9.6.7
	rm -rf dist && rm -rf public
	tsc --p tsconfig.json

build-production: build

build-demo:
	# transpiling demo app
	rm -rf public
	tsc --p demos/tsconfig.server.json
	tsc --p demos/tsconfig.client.json
	webpack --config demos/webpack.config.js
	# copying views
	rm -rf bower_components/n-live-chat
	mkdir bower_components/n-live-chat
	cp -r templates/ bower_components/n-live-chat/templates/
	# building styles
	node-sass demos/scss/demo.scss public/main.css --include-path bower_components
	@$(DONE)

demo: build-demo
	node public/app

a11y: build-demo
	@node .pa11yci.js
	@PA11Y=true node public/app
	@$(DONE)

test: verify a11y
