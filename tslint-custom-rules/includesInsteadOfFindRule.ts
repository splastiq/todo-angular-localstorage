import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new HaveToUseIncludesMethodInsteadOfFind(sourceFile, this.getOptions()));
	}
}

class HaveToUseIncludesMethodInsteadOfFind extends Lint.RuleWalker {
	public visitCallExpression(node: ts.CallExpression): void {
		if (ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === 'find') {
			if (ts.isArrowFunction(node.arguments[0])) {
				const arrowFunction = node.arguments[0] as ts.ArrowFunction;
				const body = arrowFunction.body;
				if (ts.isBinaryExpression(body) && body.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken && ts.isIdentifier(body.left) && ts.isIdentifier(body.right)) {
					if (arrowFunction.parameters[0]) {
						this.addFailureAtNode(node, 'Replace with \'includes\' method');
					}
				}
			}
		}
		super.visitCallExpression(node);
	}
}
