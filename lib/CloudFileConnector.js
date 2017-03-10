// -----------------------------------------------------------------------------
//
// This file is the copyrighted property of Tableau Software and is protected
// by registered patents and other applicable U.S. and international laws and
// regulations.
//
// Unlicensed use of the contents of this file is prohibited. Please refer to
// the NOTICES.txt file for further details.
//
// -----------------------------------------------------------------------------
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Container_1 = require("./components/Container");
var Shim_1 = require("./shim/Shim");
var ProviderFactory_1 = require("./providers/ProviderFactory");
var RequestorFactory_1 = require("./requestors/RequestorFactory");
// Create the shim. From here on out it is accessible as a global variable
Shim_1.createShim();
var messagesScript = document.createElement('script');
document.body.appendChild(messagesScript);
var formattersScript = document.createElement('script');
document.body.appendChild(formattersScript);
// Set the language to English by default if the shim's locale does not match the regex.
// We have a regex to support older builds.
var environment = Shim_1.shim.getTableauEnvironment();
var localeRegEx = /^[a-z]{2}[_][A-Z]{2}$/;
var localeMessagesFile = 'dist/compiled-locales/messages.en_US.js';
var localeFormattersFile = 'dist/compiled-locales/formatters-and-parsers.en_US.js';
if (localeRegEx.test(environment.locale)) {
    localeMessagesFile = 'dist/compiled-locales/messages.' + environment.locale + '.js';
    localeFormattersFile = 'dist/compiled-locales/formatters-and-parsers.' + environment.locale + '.js';
}
messagesScript.src = localeMessagesFile;
// Initialize Container's props based on shim-provided environment info
var provider = Shim_1.shim.getCloudProvider();
var supportedFileTypes = environment.supportedFileTypes;
// $TODO - TFSID: 593225 - Once debug strategy is figured out, switch ShimDebug to return
// a valid provider and rely on the logic in createShim to check the webpack
// configuration globals to tell whether we are in release or debug
var providerInfo = ProviderFactory_1.ProviderInfoFactory.getProviderInfo(provider);
var requestor = RequestorFactory_1.RequestorFactory.getRequestor(provider, providerInfo);
// Due to how the localize library is set up, we need to load the messages script before
// loading the formatters script.
messagesScript.onload = function () {
    formattersScript.src = localeFormattersFile;
};
formattersScript.onload = function () {
    ReactDOM.render(React.createElement(Container_1.Container, { providerInfo: providerInfo, requestor: requestor, supportedFileTypes: supportedFileTypes }), document.getElementById('root'));
};
//# sourceMappingURL=CloudFileConnector.js.map