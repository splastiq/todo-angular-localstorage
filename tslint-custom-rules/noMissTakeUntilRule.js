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
        return this.applyWithWalker(new NoMissTakeUntilWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoMissTakeUntilWalker = /** @class */ (function (_super) {
    __extends(NoMissTakeUntilWalker, _super);
    function NoMissTakeUntilWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectPropertiesName = {};
        return _this;
    }
    NoMissTakeUntilWalker.prototype.visitPropertyDeclaration = function (node) {
        if (this.isSelectProperty(node)) {
            this.selectPropertiesName[node.name.getText(this.getSourceFile())] = true;
        }
    };
    NoMissTakeUntilWalker.prototype.visitCallExpression = function (node) {
        if (this.isSubscribeMethodCalling(node) && this.isFieldFromSelectDecorator(node)) {
            var pipeMethodCallExpression = this.getPipeMethodCallExpression(node);
            if (!pipeMethodCallExpression || !this.hasTakeUntilOrFirstFunctionCall(pipeMethodCallExpression)) {
                this.addFailureAtNode(node, 'Extend from IptBaseComponent and add takeUntil(this.componentAlive) or use first() method to take only one value');
            }
        }
    };
    NoMissTakeUntilWalker.prototype.isSelectProperty = function (node) {
        return Boolean(node.decorators && node.decorators.some(function (decorator) {
            return ts.isCallExpression(decorator.expression) && ts.isIdentifier(decorator.expression.expression) && /\$?select/.test(decorator.expression.expression.text);
        }));
    };
    NoMissTakeUntilWalker.prototype.isSubscribeMethodCalling = function (node) {
        return Boolean(ts.isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === 'subscribe');
    };
    NoMissTakeUntilWalker.prototype.hasTakeUntilOrFirstFunctionCall = function (pipeMethodCallExpression) {
        return Boolean(pipeMethodCallExpression.arguments && pipeMethodCallExpression.arguments.some(function (callExpression) {
            var text = ts.isCallExpression(callExpression) && ts.isIdentifier(callExpression.expression) && callExpression.expression.text;
            return text === 'takeUntil' || text === 'first';
        }));
    };
    NoMissTakeUntilWalker.prototype.isFieldFromSelectDecorator = function (node) {
        while (node.expression) {
            if (ts.isPropertyAccessExpression(node.expression)) {
                if (this.selectPropertiesName[node.expression.name.text]) {
                    return true;
                }
            }
            node = node.expression;
        }
        return false;
    };
    NoMissTakeUntilWalker.prototype.getPipeMethodCallExpression = function (node) {
        return node.expression && ts.isPropertyAccessExpression(node.expression) &&
            node.expression.expression && ts.isCallExpression(node.expression.expression) &&
            node.expression.expression.expression && ts.isPropertyAccessExpression(node.expression.expression.expression) &&
            node.expression.expression.expression.name.text === 'pipe' ? node.expression.expression : undefined;
    };
    return NoMissTakeUntilWalker;
}(Lint.RuleWalker));
