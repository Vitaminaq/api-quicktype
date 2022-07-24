import { doCamel } from './filter';
import { workPath } from './config';
const path = require('path');
const fse = require('fs-extra');

export const typePath = path.resolve(workPath, './types');

export const getTypeModulePath = (name: string) => path.join(workPath, 'types', `${name}.d.ts`);

export const getNames = (path: string) => {
    const n = path.split('?')[0].replace('//', '').split('/');
    n.shift();
    return n.map((m: string) => m.replace(/(\{|\})/g, ''));
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
