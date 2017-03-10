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
;
var DropboxRequestor = (function (_super) {
    __extends(DropboxRequestor, _super);
    function DropboxRequestor(auth, providerInfo) {
        var _this = _super.call(this, auth, providerInfo) || this;
        _this.baseUrl = 'https://api.dropboxapi.com/2/';
        _this.contentUrl = 'https://content.dropboxapi.com/2/';
        _this.fields = 'fields=path_display,name,.tag,server_modified';
        return _this;
    }
    DropboxRequestor.prototype.sendDropboxRequest = function (url, body) {
        return this.sendRequestWithRetry(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.auth.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
    DropboxRequestor.prototype.getDropboxItems = function (url, body) {
        return this.sendDropboxRequest(url, body).then(function (response) { return response.json(); });
    };
    DropboxRequestor.prototype.getDropboxMatches = function (url, body) {
        return this.sendDropboxRequest(url, body).then(function (response) { return response.json(); });
    };
    DropboxRequestor.prototype.determineCloudItemType = function (rawItemType) {
        switch (rawItemType) {
            case 'folder':
                return CloudItemTypes_1.CloudItemType.Folder;
            case 'file':
                return CloudItemTypes_1.CloudItemType.File;
            default:
                return CloudItemTypes_1.CloudItemType.Unknown;
        }
    };
    DropboxRequestor.prototype.getPath = function (pathDisplay) {
        // pathDisplay is returned as the cloud item's full path without the root folder
        // i.e. "/Folder1/Folder2"
        // Therefore, pathArray is created as ["", "Folder1", "Folder2"]
        var pathArray = pathDisplay.split('/');
        var path = [];
        for (var i = 0; i < pathArray.length; i++) {
            if (i === 0 && pathArray[i] === '') {
                path.push({
                    id: this.providerInfo.getDefaultFolder(),
                    name: this.providerInfo.getProviderName(),
                    type: CloudItemTypes_1.CloudItemType.Folder
                });
            }
            else if (i === pathArray.length - 1) {
                // path is used to set the Breadcrumb. The way FilterableDataGrid is set up assumes that we do not
                // include the current folder as part of the path. Dropbox does include the current folder as part
                // of the path, which is why we do not push the last item into the array
                continue;
            }
            else {
                var index = pathDisplay.indexOf(pathArray[i]);
                path.push({
                    id: pathDisplay.slice(0, index + pathArray[i].length),
                    name: pathArray[i],
                    type: CloudItemTypes_1.CloudItemType.Folder
                });
            }
        }
        // We want path returned as [<root_folder>, <rest_of_the_items>]
        return path;
    };
    DropboxRequestor.prototype.getDate = function (date) {
        if (typeof (date) === 'undefined') {
            return new Date(0);
        }
        else {
            return new Date(date);
        }
    };
    DropboxRequestor.prototype.enumerateItems = function (folderPath) {
        var _this = this;
        if (folderPath === void 0) { folderPath = ''; }
        // POST https://api.dropboxapi.com/2/files/list_folder
        // body: {path: <cloud_item_path>}
        var urlRequest = this.baseUrl + 'files/list_folder';
        return this.getDropboxItems(urlRequest, { path: folderPath }).then(function (response) {
            var items = response.entries.map(function (entry) {
                var type = _this.determineCloudItemType(entry['.tag']);
                return CloudItemUtilities_1.createCloudItem(entry.path_display, // id is its path
                type, entry.name, CloudItemUtilities_1.determineExtension(type, entry.name), _this.getDate(entry.server_modified), _this.getPath(entry.path_display));
            });
            return items;
        });
    };
    DropboxRequestor.prototype.getDownloadUrl = function () {
        // POST https://content.dropboxapi.com/2/files/download
        // header: { Dropbox-API-Arg: { path: <cloud_file_path> } }
        return this.contentUrl + 'files/download';
    };
    DropboxRequestor.prototype.search = function (query) {
        var _this = this;
        // POST https://api.dropboxapi.com/2/files/search
        // body: {path: '', query: <query>}
        var urlRequest = this.baseUrl + 'files/search';
        return this.getDropboxMatches(urlRequest, { path: '', query: query }).then(function (response) {
            var items = response.matches.map(function (entry) {
                var type = _this.determineCloudItemType(entry.metadata['.tag']);
                return CloudItemUtilities_1.createCloudItem(entry.metadata.path_display, // id is its path
                type, entry.metadata.name, CloudItemUtilities_1.determineExtension(type, entry.metadata.name), _this.getDate(entry.metadata.server_modified), _this.getPath(entry.metadata.path_display));
            });
            return items;
        });
    };
    return DropboxRequestor;
}(Requestor_1.Requestor));
exports.DropboxRequestor = DropboxRequestor;
//# sourceMappingURL=DropboxRequestor.js.map