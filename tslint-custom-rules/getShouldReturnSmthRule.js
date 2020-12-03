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
        return this.applyWithWalker(new GetShouldHaveReturnTypeWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var GetShouldHaveReturnTypeWalker = /** @class */ (function (_super) {
    __extends(GetShouldHaveReturnTypeWalker, _super);
    function GetShouldHaveReturnTypeWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetShouldHaveReturnTypeWalker.prototype.visitMethodDeclaration = function (node) {
        if (/^get[A-Z]/.test(node.name.getText(this.getSourceFile())) && node.type && node.type.kind === ts.SyntaxKind.VoidKeyword) {
            this.addFailureAtNode(node.name, 'Get method should has non-void return type');
        }
    };
    return GetShouldHaveReturnTypeWalker;
}(Lint.RuleWalker));
