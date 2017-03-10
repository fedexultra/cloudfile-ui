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
var Icons_1 = require("../icons/Icons");
var Localize_1 = require("../codegen/Localize");
var shared_widgets_1 = require("shared-widgets");
// Columns for all cloud providers
// Note: id = array index
// We export a function that returns a column array instead of exporting a static constant.
// The reason is because the array makes references to the localization library, which is
// loaded at run-time.
function getCloudFileColumns() {
    return [
        {
            id: 0,
            title: Localize_1.Messages.name(),
            width: 'auto',
            hasBorder: false,
            getIconFromRow: function (row) { return row.cloudItem.icon; },
            getCellFromRow: function (row) { return row.cloudItem.name; }
        },
        {
            id: 1,
            title: Localize_1.Messages.kind(),
            width: (shared_widgets_1.TabStyles && shared_widgets_1.TabStyles.Sizing && (shared_widgets_1.TabStyles.Sizing.BaseUnit || 6) * 36) + "px",
            hasBorder: true,
            getIconFromRow: function (row) { return Icons_1.EmptyIcon; },
            getCellFromRow: function (row) { return row.cloudItem.displayKind; }
        },
        {
            id: 2,
            title: Localize_1.Messages.lastModifiedOn(),
            width: (shared_widgets_1.TabStyles && shared_widgets_1.TabStyles.Sizing && (shared_widgets_1.TabStyles.Sizing.BaseUnit || 6) * 31) + "px",
            hasBorder: false,
            getIconFromRow: function (row) { return Icons_1.EmptyIcon; },
            getCellFromRow: function (row) { return Localize_1.Formatters.formatMediumDate(row.cloudItem.modifiedAt); }
        }
    ];
}
exports.getCloudFileColumns = getCloudFileColumns;
//# sourceMappingURL=CloudFileColumns.js.map