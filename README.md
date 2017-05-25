# Shunter

## Website Purpose

This repo is for trying out [Shunter](https://github.com/springernature/shunter), a Node.js application built to read JSON and translate it into HTML.

It helps you create a decoupled front end which can serve traffic from one or more back end applications - great for use in multi-language, multi-disciplinary teams or just to make your project more flexible and future-proofed.

## Website Overview

The site will search for publications at [PubMed](https://www.ncbi.nlm.nih.gov/pubmed/) based on a term. Results are paginated. The number of results per page is set in `/config.js`.

### Server
An express server is created in `/server/index.js` to handle routing and serve JSON to Shunter. Pages data and server port are set in `/config.js`.

### Querying
Query parameters are set in the URL. Requests to PubMed are sent in `/server/send_query.js` and processed in `/server/process_pubmed.js`;

### Templating
Shunter uses [Dust.js](http://www.dustjs.com/). A Dust.js helper is used to display the current location within results, see `/dust/current-loc.js`. A Dust.js filter is used on the total result count to include commas as thousand separator.

Template files are in `/client/view/`.

## Linters
### Templates
Using [Dustmite](https://www.npmjs.com/package/dustmite) to validate templates. To run, in root,
```
$ ./node_modules/.bin/dustmite
```
### JavaScript
Using [XO](https://github.com/sindresorhus/xo) to lint JavaScript files. Options are set in `/config.js`.  To run,
```
$ npm test
```

### Tests
Tests are in `/test/templates-test.js`. To run tests, in root,
```
$ ./node_modules/mocha/bin/mocha
```

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Requirements
[Node](https://nodejs.org/)

### Installing
Clone the repository
```
$ git clone https://github.com/lawshe/shunter.git
$ cd shunter
$ npm install
```
### Running
Start the app,
```
$ npm start
```

Open [localhost:3000](http://localhost:3000) in your browser.
