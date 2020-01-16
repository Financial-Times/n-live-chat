require('sucrase/register');
const express = require('@financial-times/n-internal-tool');
const { PageKitReactJSX } = require('@financial-times/dotcom-server-react-jsx');

const app = express({
	name: 'public',
	systemCode: 'n-live-chat-demo',
	defaultLayout: 'wrapper',
	viewsDirectory: '/demos/views',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	demo: true,
	s3o: false
});

app.use(express.static('public'));
app.engine('.jsx', new PageKitReactJSX().engine);

const salesforceConfig = {
	deploymentId: process.env.SALESFORCE_DEPLOYMENT_ID,
	organisationId: process.env.SALESFORCE_ORGANISATION_ID,
	buttonReference: process.env.SALESFORCE_BUTTON_REFERENCE,
	host: process.env.SALESFORCE_HOST
};

app.get('/popup', (req, res) => {
	res.render('demo.jsx', {
		style: 'popup',
		salesforceConfig
	});
});

app.get('/inline', (req, res) => {
	res.render('demo.jsx', {
		style: 'inline',
		salesforceConfig
	});
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
