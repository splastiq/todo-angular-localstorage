import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new TypeShouldHasTAtTheBeginningRule(sourceFile, this.ruleName, this.getOptions()));
	}
}

class TypeShouldHasTAtTheBeginningRule extends Lint.AbstractWalker<any> {
	public walk(): void {
		const statements: ts.TypeAliasDeclaration[] = this.getSourceFile().statements.filter(statement => ts.isTypeAliasDeclaration(statement)) as any;
		statements.forEach((statement: ts.TypeAliasDeclaration) => {
			if (!/^T[A-Z]/.test(statement.name.text)) {
				this.addFailureAtNode(statement.name, 'Each type alias should starts with T letter');
			}
		});
	}
}
