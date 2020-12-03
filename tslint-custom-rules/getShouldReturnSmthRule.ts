import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new GetShouldHaveReturnTypeWalker(sourceFile, this.getOptions()));
	}
}

class GetShouldHaveReturnTypeWalker extends Lint.RuleWalker {
	public visitMethodDeclaration(node: ts.MethodDeclaration): void {
		if (/^get[A-Z]/.test(node.name.getText(this.getSourceFile())) && node.type && node.type.kind === ts.SyntaxKind.VoidKeyword) {
			this.addFailureAtNode(node.name, 'Get method should has non-void return type');
		}
	}
}
