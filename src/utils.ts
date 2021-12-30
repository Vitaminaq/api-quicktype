import path from 'path';
import jiti from 'jiti';
import inquirer from 'inquirer';
const fse = require('fs-extra');

export const cwd = process.cwd();

export const typePath = path.resolve(cwd, './types');

export const getTypeModulePath = (name: string) => path.join(cwd, 'types', `${name}.d.ts`);

interface Config {
    email: string;
    password: string;
    baseURL: string;
    limit: number;
    all: boolean;
}
const requiredField: (keyof Config)[] = ['email', 'password', 'baseURL'];

export const inputConfig = async (config: Partial<Config>) => {
    const list: any[] = [];

    requiredField.forEach(k => {
        if (!config || !config[k]) {
            list.push({
                type: 'input',
                message: `yapi ${k}：`,
                name: k,
                filter: (res: string) => res.trim()
            });
        }
    });
    if (!list.length) return;
    return inquirer.prompt(list);
}

export const mergeConfig = async () => {
    const config = {
        email: '',
        password: '',
        baseURL: '',
        limit: 1000,
        all: true
    };
    let userConfig = {};
    try {
        userConfig = jiti(path.resolve(cwd))('./yapi-quicktype.config').default;
    } catch (e) {
        userConfig = await inputConfig(config);
    }
    Object.assign(config, userConfig);
    Object.assign(config, await inputConfig(config));
    return config;
};

export const getNames = (path: string) => {
    const n = path.split('?')[0].replace('//', '').split('/');
    n.shift();
    return n.map((m: string) => m.replace(/\{/g, '').replace(/\}/g, ''));
}

export const doCamel = (name: string) => {
    if (!name) return '';
    return name.split('').reduce((p: string, c: string, i: number) => {
        if (i === 1) return p.toUpperCase() + c;
        if (p.indexOf('-') !== -1 || p.indexOf('_') !== -1) return p.replace('-', '').replace('_', '') + c.toUpperCase();
        return p + c;
    });
}

export const clean = () => fse.emptyDirSync(typePath);
export const createTypesFolder = () => fse.ensureDirSync(typePath);
export const createTypeFile = (name: string) => fse.ensureDirSync(typePath);

export class TypeFile {
    public filePath: string = '';

    public constructor(fileName: string) {
       this.filePath = getTypeModulePath(fileName);
       fse.ensureFileSync(this.filePath);
    }

    public read() {
        return fse.readFileSync(this.filePath);
    }

    public write(content: string) {
        return fse.writeFileSync(this.filePath, content);
    }
}
