import { yapi } from './yapi';
import { swagger } from './swagger';
import { getConfig, setWorkPath, setVscode } from './utils/config';

export default async (path: string, vscode?: any) => {
    setWorkPath(path);
    setVscode(vscode);

    const { platform } = await getConfig();

    if (!platform && vscode) {
        vscode.window.showErrorMessage('请当前目录下配置quicktype.config');
    }

    switch (platform) {
        case 'yapi':
            await yapi();
            break;
        case 'swagger':
            await swagger();
            break;
    }
    vscode.window.showInformationMessage('ts类型文件生成成功!!!');
}
