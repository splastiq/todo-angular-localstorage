"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        return this.applyWithWalker(new HaveToUseIncludesMethodInsteadOfFind(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var HaveToUseIncludesMethodInsteadOfFind = /** @class */ (function (_super) {
    __extends(HaveToUseIncludesMethodInsteadOfFind, _super);
    function HaveToUseIncludesMethodInsteadOfFind() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HaveToUseIncludesMethodInsteadOfFind.prototype.visitCallExpression = function (node) {
        if (ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === 'find') {
            if (ts.isArrowFunction(node.arguments[0])) {
                var arrowFunction = node.arguments[0];
                var body = arrowFunction.body;
                if (ts.isBinaryExpression(body) && body.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken && ts.isIdentifier(body.left) && ts.isIdentifier(body.right)) {
                    if (arrowFunction.parameters[0]) {
                        this.addFailureAtNode(node, 'Replace with \'includes\' method');
                    }
                }
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return HaveToUseIncludesMethodInsteadOfFind;
}(Lint.RuleWalker));
