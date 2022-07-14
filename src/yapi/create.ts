import { quicktypeJSONSchema, quicktypeJSON } from '../utils/quicktype';
import { getNamespace } from '../utils/utils';
import { WriteQueue } from '../utils/queue';
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
        let k = i.name;
        const ks = Object.keys(p);
        if (!k || ks.includes(k) || ks.includes(`${k}__optional__`)) return;
        if (!Number(i.required)) {
            k = `${k}__optional__`;
        }
        p[k] = p[i.example] || '';
    });
    if (!Object.keys(p).length) return '';
    try {
        const { lines } = await quicktypeJSON('typescript', 'Params', JSON.stringify(p));
        return lines.join("\n").replace(/__optional__/g, '?');
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
    const res = getNamespace(path, method);
    if (!res) return;

    const { nameSpace, fileName } = res;

    const content = `
    // ${path} - ${method}
    declare namespace ${nameSpace} {
        ${await createParamsInterface(method.toLowerCase() === 'get' ? req_query : req_body_form, path)}
        ${await createResponseInterface(res_body, path)}
    }`;

    writeQueue.push({
        fileName,
        content
    });
};
