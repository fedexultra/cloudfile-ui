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

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Container } from './components/Container';
import { createShim, shim } from './shim/Shim';
import { Logger } from './utils/Logger';
import { Provider } from './types/ShimTypes';
import { ProviderInfo } from './providers/ProviderInfo';
import { ProviderInfoFactory } from './providers/ProviderFactory';
import { Requestor } from './requestors/Requestor';
import { RequestorFactory } from './requestors/RequestorFactory';

// Create the shim. From here on out it is accessible as a global variable
createShim();

let messagesScript = document.createElement('script');
document.body.appendChild(messagesScript);
let formattersScript = document.createElement('script');
document.body.appendChild(formattersScript);

// Set the language to English by default if the shim's locale does not match the regex.
// We have a regex to support older builds.
const environment = shim.getTableauEnvironment();
Logger.info(`Tableau environment: ` +
            `buildNumber=${environment.buildNumber} ` +
            `edition=${environment.edition} ` +
            `locale=${environment.locale} ` +
            `os=${environment.os} ` +
            `version=${environment.version} ` +
            `supportedFileTypes=${environment.supportedFileTypes}`);
const localeRegEx = /^[a-z]{2}[_][A-Z]{2}$/;
let localeMessagesFile = 'dist/compiled-locales/messages.en_US.js';
let localeFormattersFile = 'dist/compiled-locales/formatters-and-parsers.en_US.js';
if (localeRegEx.test(environment.locale)) {
  localeMessagesFile = 'dist/compiled-locales/messages.' + environment.locale + '.js';
  localeFormattersFile = 'dist/compiled-locales/formatters-and-parsers.' + environment.locale + '.js';
}

// Load the files required for localization.
messagesScript.src = localeMessagesFile;

// Initialize Container's props based on shim-provided environment info
const provider: Provider = shim.getCloudProvider();
const supportedFileTypes = environment.supportedFileTypes;

// $TODO - TFSID: 593225 - Once debug strategy is figured out, switch ShimDebug to return
// a valid provider and rely on the logic in createShim to check the webpack
// configuration globals to tell whether we are in release or debug
const providerInfo: ProviderInfo = ProviderInfoFactory.getProviderInfo(provider);
const requestor: Requestor = RequestorFactory.getRequestor(provider, providerInfo);

// Occasionally, the formatterScript won't load properly causing the ui to become blank.
// We want to make the load synchronous to prevent that from happening.
messagesScript.onload = () => {
  formattersScript.src = localeFormattersFile;
};

formattersScript.onload = () => {
  ReactDOM.render(
    <Container providerInfo={providerInfo} requestor={requestor} supportedFileTypes={supportedFileTypes} />,
    document.getElementById('root')
  );
};
