import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new UseCorrectRxjsPathsRule(sourceFile, this.ruleName, this.getOptions()));
	}
}

class UseCorrectRxjsPathsRule extends Lint.AbstractWalker<any> {
	public walk(): void {
		const statements: ts.ImportDeclaration[] = this.getSourceFile().statements.filter(statement => ts.isImportDeclaration(statement)) as any;
		statements.forEach(node => {
			const importPath = (node.moduleSpecifier as ts.StringLiteral).text;
			if (/^rxjs/.test(importPath) && !(importPath === 'rxjs' || importPath === 'rxjs/operators')) {
				this.addFailureAtNode(node, 'Use "rxjs" or "rxjs/operators" only');
			}
		});
	}
}
