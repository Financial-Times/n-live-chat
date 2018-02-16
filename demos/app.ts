import { Application, Request, Response } from 'express';
import { Server } from 'http';
import * as express from '@financial-times/n-internal-tool';
import * as chalk from 'chalk';

const { red: errorHighlight, green: highlight } = chalk.default.bold;

// HACK: because the n-express version of `app.listen` promisifies the 'Server' type response
// Next line to suppress a 'not assignable to type Server' error
// @ts-ignore
interface nInternalTool extends Application {
    listen(port: number, callback?: Function): Promise<Server>;
}

const app = express({
	name: 'public',
	systemCode: 'n-live-chat-demo',
	defaultLayout: 'wrapper',
	viewsDirectory: '/demos/views',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	demo: true,
	s3o: false
}) as nInternalTool;

interface SalesforceConfig {
	deploymentId?: string;
	organisationId?: string;
	buttonReference?: string;
	host?: string;
}

const salesforceConfig: SalesforceConfig = {
	deploymentId: process.env.SALESFORCE_DEPLOYMENT_ID,
	organisationId: process.env.SALESFORCE_ORGANISATION_ID,
	buttonReference: process.env.SALESFORCE_BUTTON_REFERENCE,
	host: process.env.SALESFORCE_HOST
}

const render = (title: string) => (req: Request, res: Response) => {
	res.render(`demo-${title}`, {
		title,
		salesforceConfig
    });
};

app.get('/popup', render('popup'));
app.get('/inline', render('inline'));

function runPa11yTests (): void { 
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data: Object) => {
		console.log(highlight(`${data}`)); //eslint-disable-line
	});

	pa11y.stderr.on('data', (error: Object) => {
		console.log(errorHighlight(`${error}`)); //eslint-disable-line
	});

	pa11y.on('close', (code: number) => {
		process.exit(code);
	});
}

const server = app.listen(5005);

if (process.env.PA11Y === 'true') {
	server.then(runPa11yTests);
}

export default app;