node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	rm -rf dist && rm -rf public
	tsc --p tsconfig.json

build-production: build

build-demo:
	# transpiling demo app
	rm -rf public
	tsc --p demos/tsconfig.client.json
	webpack --config demos/webpack.config.js
	# building styles
	node-sass demos/scss/demo.scss public/main.css --include-path bower_components
	@$(DONE)

demo: build-demo
	node demos/app

a11y: build-demo
	@node .pa11yci.js
	@PA11Y=true node demos/app
	@$(DONE)

test: verify a11y
