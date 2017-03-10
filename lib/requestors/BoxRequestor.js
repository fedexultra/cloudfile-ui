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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var CloudItemTypes_1 = require("../types/CloudItemTypes");
var CloudItemUtilities_1 = require("../utils/CloudItemUtilities");
var Errors_1 = require("../utils/Errors");
var Logger_1 = require("../utils/Logger");
var Requestor_1 = require("./Requestor");
;
var BoxRequestor = (function (_super) {
    __extends(BoxRequestor, _super);
    function BoxRequestor(auth, providerInfo) {
        var _this = _super.call(this, auth, providerInfo) || this;
        _this.baseUrl = 'https://api.box.com/2.0/';
        _this.fields = 'fields=id,name,modified_at,type,path_collection';
        _this.limitField = 'limit=1000';
        return _this;
    }
    BoxRequestor.prototype.sendBoxRequest = function (url) {
        return this.sendRequestWithRetry(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.auth.accessToken
            }
        });
    };
    BoxRequestor.prototype.requestBoxItems = function (url) {
        return this.sendBoxRequest(url).then(function (response) { return response.json(); });
    };
    // Extracts a CloudItem from a fetch response promise
    BoxRequestor.prototype.getCloudItem = function (promise) {
        var _this = this;
        return promise.then(function (response) {
            if (response.status === 404) {
                throw new Errors_1.CloudItemNotFoundError();
            }
            var file = response.json();
            return file.then(_this.constructItem);
        });
    };
    // Extracts an array of CloudItems from fetch response promise(s). Supports paging and fetches all the results
    BoxRequestor.prototype.getCloudItemArray = function (promise, urlRequest) {
        var _this = this;
        return promise.then(function (boxFolder) {
            var cloudItems = [];
            cloudItems = cloudItems.concat(boxFolder.entries.map(_this.constructItem));
            // To retrieve the next page, set the offset=offset+limit
            var newOffset = boxFolder.limit + boxFolder.offset;
            // To determine if there are more records to fetch, check if the total number of items is more than the new offset
            if (boxFolder.total_count <= newOffset) {
                return cloudItems;
            }
            var pagePromiseArray = [];
            while (boxFolder.total_count > newOffset) {
                var newUrlRequest = urlRequest + '&offset=' + newOffset;
                var nextPromise = _this.requestBoxItems(newUrlRequest);
                pagePromiseArray.push(nextPromise);
                newOffset += boxFolder.limit;
            }
            return Promise.all(pagePromiseArray).then(function (results) {
                results.forEach(function (pageBoxItems) {
                    cloudItems = cloudItems.concat(pageBoxItems.entries.map(_this.constructItem));
                });
                return cloudItems;
            });
        });
    };
    // Creates a new CloudItem from a BoxFile, whose format is determined by the API
    BoxRequestor.prototype.constructItem = function (apiObj) {
        var type = BoxRequestor.determineCloudItemType(apiObj.type);
        return CloudItemUtilities_1.createCloudItem(apiObj.id, type, apiObj.name, CloudItemUtilities_1.determineExtension(type, apiObj.name), new Date(apiObj.modified_at), apiObj.path_collection.entries.map(function (pathCollectionEntry) {
            return {
                id: pathCollectionEntry.id,
                name: pathCollectionEntry.name,
                type: BoxRequestor.determineCloudItemType(pathCollectionEntry.type),
            };
        }));
    };
    // Determines the CloudItemType for the raw provider item type.
    BoxRequestor.determineCloudItemType = function (rawItemType) {
        switch (rawItemType) {
            case 'folder':
                return CloudItemTypes_1.CloudItemType.Folder;
            case 'file':
                return CloudItemTypes_1.CloudItemType.File;
            default:
                return CloudItemTypes_1.CloudItemType.Unknown;
        }
    };
    BoxRequestor.prototype.getItemFromUrl = function (url) {
        // URL format: https://<subdomain>/<folder path>/f_<file id>
        var parts = url.split('?')[0].split('/');
        var filePart = parts[parts.length - 1];
        if (filePart.indexOf('f_') === 0) {
            var fileId = filePart.slice(2, filePart.length);
            var urlRequest = this.baseUrl + 'files/' + fileId + '?' + this.fields;
            var response = this.sendBoxRequest(urlRequest);
            return this.getCloudItem(response);
        }
        else {
            return Promise.reject(new Errors_1.CloudItemNotFoundError());
        }
    };
    BoxRequestor.prototype.searchForItems = function (searchQuery) {
        var urlRequest = this.baseUrl + 'search?query=' + encodeURIComponent(searchQuery) + '&' + this.limitField + '&' + this.fields;
        var response = this.requestBoxItems(urlRequest);
        return this.getCloudItemArray(response, urlRequest);
    };
    BoxRequestor.prototype.enumerateItems = function (folderId) {
        if (folderId === void 0) { folderId = '0'; }
        var urlRequest = this.baseUrl + 'folders/' + folderId + '/items?' + this.limitField + '&' + this.fields;
        var response = this.requestBoxItems(urlRequest);
        return this.getCloudItemArray(response, urlRequest);
    };
    BoxRequestor.prototype.getDownloadUrl = function (fileID) {
        return this.baseUrl + 'files/' + fileID + '/content';
    };
    BoxRequestor.prototype.search = function (query) {
        if (BoxRequestor.searchUrlRegex.test(query)) {
            return this.getItemFromUrl(query)
                .then(function (item) { return [item]; })
                .catch(function (error) {
                if (error !== undefined) {
                    return [];
                }
                else {
                    Logger_1.log("Unknown error was caught after entering invalid url " + query + ". Error message: " + error.message);
                    return [];
                }
            });
        }
        else {
            return this.searchForItems(query);
        }
    };
    return BoxRequestor;
}(Requestor_1.Requestor));
exports.BoxRequestor = BoxRequestor;
//# sourceMappingURL=BoxRequestor.js.map