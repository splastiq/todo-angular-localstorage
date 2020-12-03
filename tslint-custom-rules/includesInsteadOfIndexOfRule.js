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
        return this.applyWithWalker(new HaveToUseIncludesMethodInsteadOfIndexOf(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var HaveToUseIncludesMethodInsteadOfIndexOf = /** @class */ (function (_super) {
    __extends(HaveToUseIncludesMethodInsteadOfIndexOf, _super);
    function HaveToUseIncludesMethodInsteadOfIndexOf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HaveToUseIncludesMethodInsteadOfIndexOf.prototype.visitBinaryExpression = function (node) {
        if (node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken || node.operatorToken.kind === ts.SyntaxKind.LessThanEqualsToken) {
            if (this.indexOfCall(node.left) && this.isMinusOneLiteral(node.right)) {
                this.addFailureAtNode(node, 'Replace with \'includes\' method');
            }
        }
        if (node.operatorToken.kind === ts.SyntaxKind.LessThanToken || node.operatorToken.kind === ts.SyntaxKind.GreaterThanEqualsToken) {
            if (this.indexOfCall(node.left) && this.isZeroLiteral(node.right)) {
                this.addFailureAtNode(node, 'Replace with \'includes\' method');
            }
        }
    };
    HaveToUseIncludesMethodInsteadOfIndexOf.prototype.indexOfCall = function (node) {
        if (ts.isCallExpression(node)) {
            if (ts.isPropertyAccessExpression(node.expression)) {
                return node.expression.name.text === 'indexOf';
            }
        }
        return false;
    };
    HaveToUseIncludesMethodInsteadOfIndexOf.prototype.isMinusOneLiteral = function (node) {
        if (ts.isPrefixUnaryExpression(node)) {
            if (node.operator === ts.SyntaxKind.MinusToken && node.operand.getText(this.getSourceFile()) === '1') {
                return true;
            }
        }
        return false;
    };
    HaveToUseIncludesMethodInsteadOfIndexOf.prototype.isZeroLiteral = function (node) {
        if (ts.isNumericLiteral(node)) {
            if (node.text === '0') {
                return true;
            }
        }
        return false;
    };
    return HaveToUseIncludesMethodInsteadOfIndexOf;
}(Lint.RuleWalker));
