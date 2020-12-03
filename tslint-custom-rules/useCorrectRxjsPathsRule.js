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
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new UseCorrectRxjsPathsRule(sourceFile, this.ruleName, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var UseCorrectRxjsPathsRule = /** @class */ (function (_super) {
    __extends(UseCorrectRxjsPathsRule, _super);
    function UseCorrectRxjsPathsRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UseCorrectRxjsPathsRule.prototype.walk = function () {
        var _this = this;
        var statements = this.getSourceFile().statements.filter(function (statement) { return ts.isImportDeclaration(statement); });
        statements.forEach(function (node) {
            var importPath = node.moduleSpecifier.text;
            if (/^rxjs/.test(importPath) && !(importPath === 'rxjs' || importPath === 'rxjs/operators')) {
                _this.addFailureAtNode(node, 'Use "rxjs" or "rxjs/operators" only');
            }
        });
    };
    return UseCorrectRxjsPathsRule;
}(Lint.AbstractWalker));
