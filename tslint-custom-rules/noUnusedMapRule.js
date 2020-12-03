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
var ts = require("typescript");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoMapWithoutAssignmentRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'Return value from Array.prototype.map should be assigned to a variable. ' +
        'Consider using Array.prototype.forEach instead.';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoMapWithoutAssignmentRuleWalker = /** @class */ (function (_super) {
    __extends(NoMapWithoutAssignmentRuleWalker, _super);
    function NoMapWithoutAssignmentRuleWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoMapWithoutAssignmentRuleWalker.prototype.visitPropertyAccessExpression = function (node) {
        this.checkAndReport(node);
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    NoMapWithoutAssignmentRuleWalker.prototype.checkAndReport = function (node) {
        if (this.isMapCall(node) && !this.isAssignment(node) && !this.isUsed(node)) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
    };
    NoMapWithoutAssignmentRuleWalker.prototype.isMapCall = function (node) {
        var isCallExpression = ts.isCallExpression(node.parent);
        var isMap = node.name.text === 'map';
        return isCallExpression && isMap;
    };
    NoMapWithoutAssignmentRuleWalker.prototype.isAssignment = function (node) {
        var parent1 = node.parent;
        if (parent1 && ts.isCallExpression(parent1)) {
            var parent2 = parent1.parent;
            var parentIsAssignment = ts.isPropertyAssignment(parent2) ||
                ts.isVariableDeclaration(parent2) ||
                (ts.isBinaryExpression(parent2) && parent2.operatorToken.kind === ts.SyntaxKind.FirstAssignment);
            if (parentIsAssignment) {
                return true;
            }
        }
        return false;
    };
    NoMapWithoutAssignmentRuleWalker.prototype.isUsed = function (node) {
        var parent1 = node.parent;
        if (parent1 && ts.isCallExpression(parent1)) {
            var parent2 = parent1.parent;
            if (this.parentUsesNode(parent2)) {
                return true;
            }
        }
        return false;
    };
    NoMapWithoutAssignmentRuleWalker.prototype.parentUsesNode = function (parent) {
        return Boolean(parent &&
            (ts.isPropertyAccessExpression(parent) ||
                ts.isPropertyDeclaration(parent) ||
                ts.isReturnStatement(parent) ||
                ts.isCallOrNewExpression(parent) ||
                ts.isSpreadElement(parent) ||
                ts.isJsxExpression(parent) ||
                ts.isConditionalExpression(parent) ||
                ts.isArrayLiteralExpression(parent) ||
                ts.isBinaryExpression(parent) ||
                ts.isArrowFunction(parent)));
    };
    return NoMapWithoutAssignmentRuleWalker;
}(Lint.RuleWalker));
