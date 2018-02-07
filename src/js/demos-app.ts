import express from '@financial-times/n-internal-tool';
import * as chalk from 'chalk';

const errorHighlight = chalk.default.bold.red;
const highlight = chalk.default.bold.green;
const defaultLayout = 'wrapper';

const app = module.exports = express({
	name: 'public',
	systemCode: 'n-live-chat-demo',
	withFlags: false,
	withHandlebars: true,
	withNavigation: false,
	withAnonMiddleware: false,
	hasHeadCss: false,
	viewsDirectory: '/demos/templates',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	demo: true,
	s3o: false
});

interface SalesforceConfig {
	deploymentId: string;
	organisationId: string;
	buttonReference: string;
	host: string;
}

let salesforceConfig: SalesforceConfig = {
	deploymentId: process.env.SALESFORCE_DEPLOYMENT_ID,
	organisationId: process.env.SALESFORCE_ORGANISATION_ID,
	buttonReference: process.env.SALESFORCE_BUTTON_REFERENCE,
	host: process.env.SALESFORCE_HOST
}

// salesforceConfig.deploymentId = process.env.SALESFORCE_DEPLOYMENT_ID;
// salesforceConfig.organisationId = process.env.SALESFORCE_ORGANISATION_ID;
// salesforceConfig.buttonReference = process.env.SALESFORCE_BUTTON_REFERENCE;
// salesforceConfig.host = process.env.SALESFORCE_HOST;



// interface renderApp(demoType: string, config: salesforceConfig)

const renderApp = (demoType: string, config: SalesforceConfig) => {

};


app.get('/popup', (req, res) => {
	res.render('demo-popup', {
		title: 'popup',
		layout: 'wrapper',
		salesforceConfig
    });
});

app.get('/inline', (req, res) => {
	res.render('demo-inline', {
		title: 'inline',
		layout: 'wrapper',
		salesforceConfig
    });
});

function runPa11yTests () {
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data: any) => {
		console.log(highlight(`${data}`)); //eslint-disable-line
	});

	pa11y.stderr.on('data', (error: string) => {
		console.log(errorHighlight(`${error}`)); //eslint-disable-line
	});

	pa11y.on('close', (code: number) => {
		process.exit(code);
	});
}

const listen = app.listen(5005);

if (process.env.PA11Y === 'true') {
	listen.then(runPa11yTests);
}
