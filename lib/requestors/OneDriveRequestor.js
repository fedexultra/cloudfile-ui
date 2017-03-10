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
var Requestor_1 = require("./Requestor");
;
var OneDriveRequestor = (function (_super) {
    __extends(OneDriveRequestor, _super);
    function OneDriveRequestor(auth, providerInfo) {
        var _this = _super.call(this, auth, providerInfo) || this;
        _this.baseUrl = 'https://graph.microsoft.com/v1.0/me';
        return _this;
    }
    OneDriveRequestor.prototype.sendOneDriveRequest = function (url) {
        return this.sendRequestWithRetry(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.auth.accessToken,
                'Content-Type': 'application/json'
            }
        });
    };
    OneDriveRequestor.prototype.getOneDriveItems = function (url) {
        return this.sendOneDriveRequest(url).then(function (response) { return response.json(); });
    };
    OneDriveRequestor.prototype.determineCloudItemType = function (item) {
        if (typeof (item.folder) !== 'undefined') {
            return CloudItemTypes_1.CloudItemType.Folder;
        }
        else if (typeof (item.file) !== 'undefined') {
            return CloudItemTypes_1.CloudItemType.File;
        }
        else {
            return CloudItemTypes_1.CloudItemType.Unknown;
        }
    };
    OneDriveRequestor.prototype.getPath = function (pathReference) {
        // pathReference.path is returned as /drive/root:/<cloud_item_path>/<cloud_item>
        // pathArray is created as ["", "drive", "root:", <names_of_the_rest>]
        var pathArray = pathReference.path.split('/');
        var path = [];
        for (var i = 0; i < pathArray.length; i++) {
            if (i === 0 && decodeURIComponent(pathArray[i]) === '') {
                path.push({
                    id: this.providerInfo.getDefaultFolder(),
                    name: this.providerInfo.getProviderName(),
                    type: CloudItemTypes_1.CloudItemType.Folder
                });
            }
            else if ((i === 1 && decodeURIComponent(pathArray[i]) === 'drive') ||
                (i === 2 && decodeURIComponent(pathArray[i]) === 'root:')) {
                continue;
            }
            else {
                path.push({
                    id: pathReference.path,
                    name: decodeURIComponent(pathArray[i]),
                    type: CloudItemTypes_1.CloudItemType.Folder
                });
            }
        }
        // We want path returned as [<root_folder>, <rest_of_the_items>]
        return path;
    };
    OneDriveRequestor.prototype.enumerateItems = function (folderID) {
        var _this = this;
        if (folderID === void 0) { folderID = ''; }
        var urlRequest = '';
        if (folderID === this.providerInfo.getDefaultFolder()) {
            // GET https://graph.microsoft.com/v1.0/me/drive/root/children
            urlRequest = this.baseUrl + '/drive/root/children';
        }
        else {
            // GET https://graph.microsoft.com/v1.0/me/drive/root:/{item-path}:/children
            urlRequest = this.baseUrl + folderID + ':/children';
        }
        return this.getOneDriveItems(urlRequest).then(function (response) {
            var items = response.value.map(function (entry) {
                var type = _this.determineCloudItemType(entry);
                return CloudItemUtilities_1.createCloudItem(entry.parentReference.path + '/' + entry.name, // id is its path
                type, entry.name, CloudItemUtilities_1.determineExtension(type, entry.name), new Date(entry.lastModifiedDateTime), _this.getPath(entry.parentReference));
            });
            return items;
        });
    };
    OneDriveRequestor.prototype.getDownloadUrl = function (fileID) {
        // GET https://graph.microsoft.com/v1.0/me/drive/root:/{item-path}:/content
        return this.baseUrl + fileID + ':/content';
    };
    OneDriveRequestor.prototype.search = function (query) {
        var _this = this;
        // GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='{search-text}')
        var urlRequest = this.baseUrl + '/drive/root/search(q=\'{' + query + '}\')';
        return this.getOneDriveItems(urlRequest).then(function (response) {
            var items = response.value.map(function (entry) {
                var type = _this.determineCloudItemType(entry);
                return CloudItemUtilities_1.createCloudItem(entry.parentReference.path + '/' + entry.name, // id is its path
                type, entry.name, CloudItemUtilities_1.determineExtension(type, entry.name), new Date(entry.lastModifiedDateTime), _this.getPath(entry.parentReference));
            });
            return items;
        });
    };
    return OneDriveRequestor;
}(Requestor_1.Requestor));
exports.OneDriveRequestor = OneDriveRequestor;
//# sourceMappingURL=OneDriveRequestor.js.map