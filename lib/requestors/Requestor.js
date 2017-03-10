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
var Logger_1 = require("../utils/Logger");
var Shim_1 = require("../shim/Shim");
var Requestor = (function () {
    function Requestor(auth, providerInfo) {
        this.auth = auth;
        this.providerInfo = providerInfo;
    }
    Requestor.prototype.sendRequest = function (url, httpRequest) {
        return fetch(url, httpRequest);
    };
    Requestor.prototype.sendRequestWithRetry = function (url, httpRequest) {
        var _this = this;
        return this.sendRequest(url, httpRequest)
            .catch(function (error) {
            Logger_1.log('The sendRequest promise was rejected with message "' + error + '". Calling the refreshAuth method.');
            // When debugging in the browser, 401 errors cause the promise to be rejected,
            // seemingly because of a CORS issue. So, we optimistically assume that
            // that is why the promise was rejected and proceed to do a refresh.
        })
            .then(function (response) {
            if (!response || response.status === 401) {
                // If a new access token cannot be retrieved, the shim does not return
                _this.auth.accessToken = Shim_1.shim.refreshAuth();
                return _this.sendRequest(url, httpRequest);
            }
            else {
                return response;
            }
        });
    };
    return Requestor;
}());
Requestor.searchUrlRegex = new RegExp('(https?:\/\/www\.[^\s]+\.[^\s]{2,}|https?:\/\/.+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})');
exports.Requestor = Requestor;
//# sourceMappingURL=Requestor.js.map