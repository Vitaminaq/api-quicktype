const jiti = require('jiti');
const path = require('path');

export let workPath = '';

export const setWorkPath = (p: string) => {
    workPath = p;
}

export let vscode: any = null;
export const setVscode = (vs: any) => {
    vscode = vs;
}

export const mergeConfig = async () => {
    const config = {
        platform: 'yapi',
        email: '', // yapi
        password: '', // yapi
        baseURL: '', // yapi
        url: '', // swagger
        limit: 1000, // yapi
        taskLimit: 6, // yapi
        all: true
    };
    let userConfig = {};
    try {
        userConfig = jiti(path.resolve(workPath))('./quicktype.config').default;
    } catch (e) {
        vscode && vscode.window.showErrorMessage('please crate quicktype.config.js in root');
    }
    Object.assign(config, userConfig);
    return config;
};

export const createConfig = () => {
    let config: any;
    return async () => {
        if (config) return config;
        config = await mergeConfig();
        return config;
    }
}

export const getConfig = createConfig();
