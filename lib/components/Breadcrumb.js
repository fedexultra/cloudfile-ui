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
var _ = require("lodash");
var React = require("react");
var BreadcrumbItem_1 = require("./BreadcrumbItem");
var BreadcrumbStyles_1 = require("../styles/BreadcrumbStyles");
var CloudItemTypes_1 = require("../types/CloudItemTypes");
;
;
var Breadcrumb = (function (_super) {
    __extends(Breadcrumb, _super);
    function Breadcrumb(props) {
        var _this = _super.call(this, props) || this;
        _this.mounted = false;
        _this.state = { width: 0 };
        _this.getTrail = _this.getTrail.bind(_this);
        _this.handleWindowResize = _.throttle(_this.handleWindowResize.bind(_this), 100);
        return _this;
    }
    Breadcrumb.prototype.createBreadcrumbItem = function (item, trailIndex) {
        return React.createElement(BreadcrumbItem_1.BreadcrumbItem, { displayArrow: (trailIndex === this.props.trail.length - 1) ? false : true, item: item, onItemSelected: this.props.onItemSelected, key: trailIndex });
    };
    Breadcrumb.prototype.getTrail = function () {
        var _this = this;
        var breadcrumbItemsMaxCount = Math.floor(this.state.width / BreadcrumbStyles_1.BREADCRUMB_ITEM_WIDTH);
        if (breadcrumbItemsMaxCount >= this.props.trail.length || this.state.width === 0 /* initial render */) {
            var breadcrumbTrail = this.props.trail.map(function (item, i) {
                return _this.createBreadcrumbItem(item, i);
            });
            return breadcrumbTrail;
        }
        else {
            var breadcrumbTrail = [];
            breadcrumbTrail.push(this.createBreadcrumbItem(this.props.trail[0], 0));
            var ellipsisItem = { id: 'none', name: '...', type: CloudItemTypes_1.CloudItemType.Unknown };
            breadcrumbTrail.push(this.createBreadcrumbItem(ellipsisItem, 1));
            for (var i = 2; i < this.props.trail.length; i++) {
                if (i > (this.props.trail.length - breadcrumbItemsMaxCount)) {
                    breadcrumbTrail.push(this.createBreadcrumbItem(this.props.trail[i], i));
                }
                else {
                    continue;
                }
            }
            return breadcrumbTrail;
        }
    };
    Breadcrumb.prototype.handleWindowResize = function () {
        // We need to check if the component is mounted because it is possible that it
        // gets unmounted when this function is called since we throttle function calls.
        if (this.mounted) {
            this.setState({
                width: this.breadcrumbNode.offsetWidth
            });
        }
    };
    Breadcrumb.prototype.componentDidMount = function () {
        this.mounted = true;
        this.setState({
            width: this.breadcrumbNode.offsetWidth
        });
        window.addEventListener('resize', this.handleWindowResize);
    };
    Breadcrumb.prototype.componentWillUnmount = function () {
        this.mounted = false;
        window.removeEventListener('resize', this.handleWindowResize);
    };
    Breadcrumb.prototype.setBreadcrumbNode = function (node) {
        if (node !== null) {
            this.breadcrumbNode = node;
        }
    };
    Breadcrumb.prototype.render = function () {
        var _this = this;
        return (React.createElement("span", { style: BreadcrumbStyles_1.BreadcrumbSpaceStyle, ref: function (node) { return _this.setBreadcrumbNode(node); } }, this.getTrail()));
    };
    return Breadcrumb;
}(React.Component));
exports.Breadcrumb = Breadcrumb;
//# sourceMappingURL=Breadcrumb.js.map