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
    taskLimit: number;
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
        platform: 'yapi',
        email: '',
        password: '',
        baseURL: '',
        url: '',
        limit: 1000,
        taskLimit: 6,
        all: true
    };
    let userConfig = {};
    try {
        userConfig = jiti(path.resolve(cwd))('./quicktype.config').default;
    } catch (e) {
        // userConfig = await inputConfig(config);
    }
    Object.assign(config, userConfig);
    // Object.assign(config, await inputConfig(config));
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

export const getNames = (path: string) => {
    const n = path.split('?')[0].replace('//', '').split('/');
    n.shift();
    return n.map((m: string) => m.replace(/(\{|\})/g, ''));
}

const filterCharcher = [';', ':', '?', '{', '}', '[', ']'];

export const doCamel = (name: string) => {
    if (!name) return '';
    return name.split('').filter(i => !filterCharcher.includes(i)).reduce((p: string, c: string, i: number) => {
        if (!i) {
            const cn = isNaN(Number(c));
            return cn ? c.toUpperCase() : `T${c}`;
        }
        if (p.indexOf('-') !== -1 || p.indexOf('_') !== -1)
            return p.replace(/(-|_)/g, '') + c.toUpperCase();
        return p + c;
    }, '');
}

export const clean = () => fse.emptyDirSync(typePath);
export const createTypesFolder = () => fse.ensureDirSync(typePath);

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

interface NamespaceItem {
    name: string;
    method: string;
}

interface NamespaceReturn {
    nameSpace: string;
    fileName: string;
}

// 防止重复
export const namespace = () => {
    const namespaceList: NamespaceItem[] = [];
    return (path: string, method: string): NamespaceReturn | void => {
        const names: string[] = getNames(path);
        if (!names.length || !names[0]) return;

        let nameSpace = names.filter(i => i).map((i: string) => doCamel(i)).reduce((p: string, c: string) => {
            const cn = isNaN(Number(c));
            if (!cn) return `${p}.T${c}`;
            return `${p}.${c}`;
        }, '').replace('.', '');

        if (!nameSpace) return;
        const filter = namespaceList.filter(i => i.name === nameSpace)[0];
        if (filter) {
            if (filter.method === method) return;
            nameSpace = `${nameSpace}.${doCamel(method)}`;
        }
        namespaceList.push({
            name: nameSpace,
            method
        });
        return {
            nameSpace,
            fileName: names[0]
        };
    }
}

export const getNamespace = namespace();
