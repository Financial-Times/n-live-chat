require('sucrase/register');
const express = require('@financial-times/n-express');
const ReactDOM = require('react-dom/server');

const demoTemplate = require('./views/demo.jsx')

const app = express({
	name: 'public',
	systemCode: 'n-live-chat-demo',
	defaultLayout: 'wrapper',
	viewsDirectory: '/demos/views',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	demo: true,
	s3o: false,
	withFlags: true,
});

app.use(express.static('public'));

const salesforceConfig = {
	deploymentId: process.env.SALESFORCE_DEPLOYMENT_ID,
	organisationId: process.env.SALESFORCE_ORGANISATION_ID,
	buttonReference: process.env.SALESFORCE_BUTTON_REFERENCE,
	host: process.env.SALESFORCE_HOST

};

app.get('/popup', (req, res) => {
	const { liveChatStaging } = res.locals.flags;
	salesforceConfig.liveChatURL= liveChatStaging ? process.env.LIVE_CHAT_STAGING_HOST : process.env.LIVE_CHAT_PROD_HOST;
	const page = demoTemplate.default({
		liveChatProjectFelix: false,
		style: 'popup',
		salesforceConfig
	})
	res.send(ReactDOM.renderToStaticMarkup(page))
});

app.get('/inline', (req, res) => {
	const { liveChatStaging } = res.locals.flags;
	salesforceConfig.liveChatURL= liveChatStaging ? process.env.LIVE_CHAT_STAGING_HOST : process.env.LIVE_CHAT_PROD_HOST;
	const page = demoTemplate.default({
		liveChatProjectFelix: false,
		style: 'inline',
		salesforceConfig
	})
	res.send(ReactDOM.renderToStaticMarkup(page))
});

const salesforceConfigProjectFelix = {
	scriptUrl: process.env.SALESFORCE_FELIX_SCRIPT_URL_UAT,
	organisationId: process.env.SALESFORCE_FELIX_ORGANISATION_ID_UAT,
	embeddedDeploymentService: process.env.SALESFORCE_FELIX_EMBEDDED_DEPLOYMENT_SERVICE_UAT,
	embeddedServiceUrl: process.env.SALESFORCE_FELIX_EMBEDDED_SERVICE_URL_UAT,
	scrt2Url: process.env.SALESFORCE_FELIX_SCRT_2_URL_UAT,
	chatOrigin: "n-live-chat demo",
};

app.get('/inline-project-felix', (req, res) => {
	const page = demoTemplate.default({
		liveChatProjectFelix: true,
		style: 'inline',
		salesforceConfig: salesforceConfigProjectFelix,
	});
	res.send(ReactDOM.renderToStaticMarkup(page))
});

app.get('/popup-project-felix', (req, res) => {
	const page = demoTemplate.default({
		liveChatProjectFelix: true,
		style: 'popup',
		salesforceConfig: salesforceConfigProjectFelix,
	});
	res.send(ReactDOM.renderToStaticMarkup(page))
});

function runPa11yTests () {
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data) => {
		console.log(data.toString()); //eslint-disable-line
	});

	pa11y.stderr.on('data', (error) => {
		console.log(error.toString()); //eslint-disable-line
	});

	pa11y.on('close', (code) => {
		process.exit(code.toString());
	});
}

const server = app.listen(5005, () => {
	if (process.env.PA11Y === 'true') {
		runPa11yTests();
	}
});

module.exports = app;
