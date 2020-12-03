import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new HaveToUseIncludesMethodInsteadOfIndexOf(sourceFile, this.getOptions()));
	}
}

class HaveToUseIncludesMethodInsteadOfIndexOf extends Lint.RuleWalker {
	public visitBinaryExpression(node: ts.BinaryExpression): void {
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
	}

	private indexOfCall(node: ts.Expression): boolean {
		if (ts.isCallExpression(node)) {
			if (ts.isPropertyAccessExpression(node.expression)) {
				return node.expression.name.text === 'indexOf';
			}
		}
		return false;
	}

	private isMinusOneLiteral(node: ts.Expression): boolean {
		if (ts.isPrefixUnaryExpression(node)) {
			if (node.operator === ts.SyntaxKind.MinusToken && node.operand.getText(this.getSourceFile()) === '1') {
				return true;
			}
		}
		return false;
	}

	private isZeroLiteral(node: ts.Expression): boolean {
		if (ts.isNumericLiteral(node)) {
			if (node.text === '0') {
				return true;
			}
		}
		return false;
	}
}
