import { quicktypeJSONSchema, quicktypeJSON } from './quicktype';
import { doCamel, getNames } from './utils';
import { WriteQueue } from './queue';
import chalk from 'chalk';

interface Param {
    desc: string;
    example: string;
    name: string;
    required: string;
    type: string;
    _id: string;
}
export const createParamsInterface = async (params: Param[], path: string) => {
    if (!params || !params.length) return '';
    const p: Record<string, any> = {};
    params.forEach(i => {
        if (!i.name) return '';
        p[i.name] = p[i.example] || '';
    });
    if (!Object.keys(p).length) return '';
    try {
        const { lines } = await quicktypeJSON('typescript', 'Params', JSON.stringify(p));
        return lines.join("\n");
    } catch (e) {
        console.log(chalk.red('[quicktype fail：params]'), path);
        return '';
    }
}

export const createResponseInterface = async (resStr: string, path: string) => {
    const empty = 'export type Response = any;';
    if (!resStr) return empty;
    try {
        const { lines } = await quicktypeJSONSchema('typescript', 'Response', resStr);
        return lines.join("\n");
    } catch (e) {
        console.log(chalk.red('[quicktype fail：response]'), path);
        return empty;
    }
}

export const create = async (inter: any, writeQueue: WriteQueue) => {
    if (!inter) return;
    const { path, res_body, method, req_query, req_body_form } = inter;
    if (!path) return;
    const names: string[] = getNames(path);
    if (!names.length || !names[0]) return;

    const nameSpace = names.filter(i => i).map((i: string) => doCamel(i)).reduce((p: string, c: string) => {
        const pn = isNaN(Number(p));
        const cn = isNaN(Number(c));
        if (!pn && cn) return `T${p}.${c}`;
        if (!pn && !cn) return `T${p}.T${c}`;
        if (pn && !cn) return `${p}${c}`;
        return `${p}.${c}`;
    });

    if (!nameSpace) return;
    const content = `
    // ${path} - ${method}
    declare namespace ${nameSpace}.${method} {
        ${await createParamsInterface(method.toLowerCase() === 'get' ? req_query : req_body_form, path)}
        ${await createResponseInterface(res_body, path)}
    }`;

    writeQueue.push({
        fileName: names[0],
        content
    })
};
