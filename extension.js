const vscode = require('vscode');
const { run, setWorkPath } = require('./dist/quicktype.cjs');

function activate(context) {
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
		setWorkPath(folderUris[0].path.replace('/', ''));
		run(vscode);
	});
	context.subscriptions.push(disposable);
}

exports.activate = activate;