import { quicktypeJSONSchema, quicktypeJSON } from './quicktype';
import { doCamel, createTypesFolder, TypeFile } from './utils';

interface Param {
    desc: string;
    example: string;
    name: string;
    required: string;
    type: string;
    _id: string;
}
export const createParamsInterface = async (params: Param[]) => {
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
    } catch(e) {
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
        console.log('生成失败：', path);
        return empty;
    }
}

export const create = async (inter: any) => {
    createTypesFolder();
    const { path, res_body, method, req_query, req_body_form } = inter;
    if (!path) return;
    const names = path.split('?')[0].split('/').filter((i: string) => i).map((m: string) => m.replace(/\{/g, '').replace(/\}/g, ''));
    if (!names.length) return;
    const typeFile = new TypeFile(names[0]);
    let content = typeFile.read();
    if (!names.length) return;
    const nameSpace = names.map((i: string) => doCamel(i)).reduce((p: string, c: string) => {
        if (!isNaN(Number(c))) return `${p}${c}`;
        return `${p}.${c}`;
    });

    content = `${content}
    // ${path}
    declare namespace ${nameSpace} {
        ${await createParamsInterface(method.toLowerCase() === 'get' ? req_query : req_body_form)}
        ${await createResponseInterface(res_body, path)}
    }`;

    typeFile.write(content);
    // console.log(`types/${names[0]}.d.ts文件里的${nameSpace}接口生成成功！！！`);
}