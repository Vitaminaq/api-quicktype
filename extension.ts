const vscode = require('vscode');
import main from './src/main';

export function activate(context) {
	let disposable = vscode.commands.registerCommand('api.createType', async () => {
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

		const path = folderUris[0].path.replace('/', '');
		main(path, vscode);
	});
	context.subscriptions.push(disposable);
}
