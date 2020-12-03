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
        return this.applyWithWalker(new TypeShouldHasTAtTheBeginningRule(sourceFile, this.ruleName, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var TypeShouldHasTAtTheBeginningRule = /** @class */ (function (_super) {
    __extends(TypeShouldHasTAtTheBeginningRule, _super);
    function TypeShouldHasTAtTheBeginningRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeShouldHasTAtTheBeginningRule.prototype.walk = function () {
        var _this = this;
        var statements = this.getSourceFile().statements.filter(function (statement) { return ts.isTypeAliasDeclaration(statement); });
        statements.forEach(function (statement) {
            if (!/^T[A-Z]/.test(statement.name.text)) {
                _this.addFailureAtNode(statement.name, 'Each type alias should starts with T letter');
            }
        });
    };
    return TypeShouldHasTAtTheBeginningRule;
}(Lint.AbstractWalker));
