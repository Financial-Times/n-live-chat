node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

build:
	rm -rf dist && rm -rf public
	tsc --p tsconfig.json
	rollup -c
	sass src/scss/main.scss --load-path node_modules
	@$(DONE)

build-production:
	make build

build-demo:
	make build
	# transpiling demo app
	webpack --config demos/webpack.config.js
	# building styles
	sass demos/scss/demo.scss public/main.css --load-path node_modules
	@$(DONE)

demo:
	make .env
	make build-demo
	node demos/app

a11y:
	make build-demo
	@node .pa11yci.js
	@PA11Y=true node demos/app
	@$(DONE)

test: verify a11y
