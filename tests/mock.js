/* eslint-disable no-global-assign */
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { window } = new JSDOM('<div id="app"></div>', { url: 'http://localhost:1234' });
const { document } = window;
global.window = window;
global.document = document;
XMLHttpRequest = window.XMLHttpRequest;
