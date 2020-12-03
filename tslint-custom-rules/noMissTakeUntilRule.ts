import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new NoMissTakeUntilWalker(sourceFile, this.getOptions()));
	}
}

class NoMissTakeUntilWalker extends Lint.RuleWalker {
	private selectPropertiesName: {[key: string]: boolean} = {};

	protected visitPropertyDeclaration(node: ts.PropertyDeclaration): void {
		if (this.isSelectProperty(node)) {
			this.selectPropertiesName[node.name.getText(this.getSourceFile())] = true;
		}
	}

	protected visitCallExpression(node: ts.CallExpression): void {
		if (this.isSubscribeMethodCalling(node) && this.isFieldFromSelectDecorator(node)) {
			const pipeMethodCallExpression = this.getPipeMethodCallExpression(node);
			if (!pipeMethodCallExpression || !this.hasTakeUntilOrFirstFunctionCall(pipeMethodCallExpression)) {
				this.addFailureAtNode(node, 'Extend from IptBaseComponent and add takeUntil(this.componentAlive) or use first() method to take only one value');
			}
		}
	}

	private isSelectProperty(node: ts.PropertyDeclaration): boolean {
		return Boolean(node.decorators && node.decorators.some(decorator => {
			return ts.isCallExpression(decorator.expression) && ts.isIdentifier(decorator.expression.expression) && /\$?select/.test(decorator.expression.expression.text);
		}));
	}

	private isSubscribeMethodCalling(node: ts.CallExpression): boolean {
		return Boolean(
			ts.isPropertyAccessExpression(node.expression) &&
			node.expression.name.text === 'subscribe',
		);
	}

	private hasTakeUntilOrFirstFunctionCall(pipeMethodCallExpression: ts.CallExpression): boolean {
		return Boolean(pipeMethodCallExpression.arguments && pipeMethodCallExpression.arguments.some(callExpression => {
			const text = ts.isCallExpression(callExpression) && ts.isIdentifier(callExpression.expression) && callExpression.expression.text;
			return text === 'takeUntil' || text === 'first';
		}));
	}

	private isFieldFromSelectDecorator(node: any): boolean {
		while (node.expression) {
			if (ts.isPropertyAccessExpression(node.expression)) {
				if (this.selectPropertiesName[node.expression.name.text]) {
					return true;
				}
			}
			node = node.expression;
		}
		return false;
	}

	private getPipeMethodCallExpression(node: ts.CallExpression): ts.CallExpression | undefined {
		return node.expression && ts.isPropertyAccessExpression(node.expression) &&
			node.expression.expression && ts.isCallExpression(node.expression.expression) &&
			node.expression.expression.expression && ts.isPropertyAccessExpression(node.expression.expression.expression) &&
			node.expression.expression.expression.name.text === 'pipe' ? (node.expression as any).expression : undefined;
	}
}
