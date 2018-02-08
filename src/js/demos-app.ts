import { Application } from 'express';
import * as express from '@financial-times/n-internal-tool';
import * as chalk from 'chalk';

const errorHighlight = chalk.default.bold.red;
const highlight = chalk.default.bold.green;
const defaultLayout = 'wrapper';

const app = express({
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
}) as Application;

interface SalesforceConfig {
	deploymentId: string | undefined;
	organisationId: string | undefined;
	buttonReference: string | undefined;
	host: string | undefined;
}

const salesforceConfig: SalesforceConfig = {
	deploymentId: process.env.SALESFORCE_DEPLOYMENT_ID,
	organisationId: process.env.SALESFORCE_ORGANISATION_ID,
	buttonReference: process.env.SALESFORCE_BUTTON_REFERENCE,
	host: process.env.SALESFORCE_HOST
}

app.get('/popup', (req, res) => {
	res.render('demo-popup', {
		title: 'popup',
		layout: defaultLayout,
		salesforceConfig
    });
});

app.get('/inline', (req, res) => {
	res.render('demo-inline', {
		title: 'inline',
		layout: defaultLayout,
		salesforceConfig
    });
});

function runPa11yTests () {
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data: any) => {
	});

	pa11y.stderr.on('data', (error: string) => {
	});

	pa11y.on('close', (code: number) => {
		process.exit(code);
	});
}

const listen = app.listen(5005);

if (process.env.PA11Y === 'true') {
	listen.then(runPa11yTests);
}

export default app;