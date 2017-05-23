const shunter = require('shunter');
const _config = require('./config.js');

// Create a Shunter application, passing in options
const app = shunter({

	// Configure the themes path to the current directory
	path: {
		themes: __dirname
	},

	// Configure the proxy route, this should point to
	// where your back end application runs
	routes: {
		localhost: {
			default: {
				host: 'localhost',
				port: _config.server.port
			}
		}
	}

});

app.start();
