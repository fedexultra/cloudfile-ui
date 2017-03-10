"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = function (k, a) { return Localize.msg.formatMessage(k, a); };
exports.Messages = {
    cancel: function () { return t('cloud-file-connector/cancel'); },
    connect: function () { return t('cloud-file-connector/connect'); },
    file: function () { return t('cloud-file-connector/file'); },
    folder: function () { return t('cloud-file-connector/folder'); },
    kind: function () { return t('cloud-file-connector/kind'); },
    lastModifiedOn: function () { return t('cloud-file-connector/lastModifiedOn'); },
    name: function () { return t('cloud-file-connector/name'); },
    queryErrorMessage: function () { return t('cloud-file-connector/queryErrorMessage'); },
    search: function () { return t('cloud-file-connector/search'); },
    searchResultsMessage: function () { return t('cloud-file-connector/searchResultsMessage'); },
    signedInAs: function (a) { return t('cloud-file-connector/signedInAs', a); },
    signOut: function () { return t('cloud-file-connector/signOut'); },
    urlErrorMessage: function () { return t('cloud-file-connector/urlErrorMessage'); },
};
exports.Formatters = {
    formatMediumDate: function (a) { return Localize.fmt.formatDate(a, { "date": "medium" }); },
};
//# sourceMappingURL=Localize.js.map