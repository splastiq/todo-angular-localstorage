import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {

	public static FAILURE_STRING: string = 'Return value from Array.prototype.map should be assigned to a variable. ' +
		'Consider using Array.prototype.forEach instead.';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new NoMapWithoutAssignmentRuleWalker(sourceFile, this.getOptions()));
	}
}

class NoMapWithoutAssignmentRuleWalker extends Lint.RuleWalker {
	protected visitPropertyAccessExpression(node: ts.PropertyAccessExpression): void {
		this.checkAndReport(node);
		super.visitPropertyAccessExpression(node);
	}

	private checkAndReport(node: ts.PropertyAccessExpression): void {
		if (this.isMapCall(node) && !this.isAssignment(node) && !this.isUsed(node)) {
			this.addFailureAtNode(node, Rule.FAILURE_STRING);
		}
	}

	private isMapCall(node: ts.PropertyAccessExpression): boolean {
		const isCallExpression = ts.isCallExpression(node.parent!);
		const isMap = node.name.text === 'map';
		return isCallExpression && isMap;
	}

	private isAssignment(node: ts.PropertyAccessExpression): boolean {
		const { parent: parent1 } = node;
		if (parent1 && ts.isCallExpression(parent1)) {
			const { parent: parent2 } = parent1;
			const parentIsAssignment =
				ts.isPropertyAssignment(parent2!) ||
				ts.isVariableDeclaration(parent2!) ||
				(ts.isBinaryExpression(parent2!) && (parent2 as any)!.operatorToken.kind === ts.SyntaxKind.FirstAssignment);
			if (parentIsAssignment) {
				return true;
			}
		}
		return false;
	}

	private isUsed(node: ts.PropertyAccessExpression): boolean {
		const { parent: parent1 } = node;
		if (parent1 && ts.isCallExpression(parent1)) {
			const { parent: parent2 } = parent1;
			if (this.parentUsesNode(parent2)) {
				return true;
			}
		}
		return false;
	}

	private parentUsesNode(parent?: ts.Node): boolean {
		return Boolean(
			parent &&
			(ts.isPropertyAccessExpression(parent) ||
				ts.isPropertyDeclaration(parent) ||
				ts.isReturnStatement(parent) ||
				ts.isCallOrNewExpression(parent) ||
				ts.isSpreadElement(parent) ||
				ts.isJsxExpression(parent) ||
				ts.isConditionalExpression(parent) ||
				ts.isArrayLiteralExpression(parent) ||
				ts.isBinaryExpression(parent) ||
				ts.isArrowFunction(parent)),
		);
	}
}
