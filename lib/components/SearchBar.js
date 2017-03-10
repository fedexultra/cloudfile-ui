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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Localize_1 = require("../codegen/Localize");
var shared_widgets_1 = require("shared-widgets");
var SpaceStyles_1 = require("../styles/SpaceStyles");
var SearchBar = (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { query: _this.props.displayText };
        return _this;
    }
    SearchBar.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.resetQuery) {
            this.setState({ query: nextProps.displayText });
        }
    };
    SearchBar.prototype.handleChange = function (text) {
        this.setState({ query: text });
    };
    SearchBar.prototype.handleCancelSearch = function () {
        this.setState({ query: '' });
        this.props.handleCancel();
    };
    SearchBar.prototype.handleEnter = function () {
        this.props.handleEnter(this.state.query);
    };
    SearchBar.prototype.render = function () {
        var _this = this;
        var searchFieldProps = {
            text: this.state.query,
            handleChange: function (text) { return _this.handleChange(text); },
            handleEnter: function () { return _this.handleEnter(); },
            placeholder: Localize_1.Messages.search(),
            containerStyle: SpaceStyles_1.SpaceStyle,
            testId: 'search-bar',
            handleCancelSearch: function () { return _this.handleCancelSearch(); },
        };
        return (React.createElement(shared_widgets_1.SearchFieldWidget, __assign({}, searchFieldProps)));
    };
    return SearchBar;
}(React.Component));
exports.SearchBar = SearchBar;
//# sourceMappingURL=SearchBar.js.map