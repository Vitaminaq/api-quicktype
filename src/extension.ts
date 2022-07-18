import * as vscode from 'vscode';
import main from './main';
import { setWorkPath } from './utils/utils';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.APIQuicktype', async () => {
		const folderUris = await vscode.window.showOpenDialog({
			canSelectFolders: true,
			canSelectFiles: false,
			canSelectMany: false,
			openLabel: 'Select save place',
		});
		if (!folderUris) {
			vscode.window.showErrorMessage('请选择类型文件存放位置');
			return null;
		}
		setWorkPath(folderUris[0].path.replace('/', ''));
		main(vscode);
	});
	context.subscriptions.push(disposable);
}