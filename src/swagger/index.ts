import { getConfig, getNamespace } from '../utils/utils';
import { api } from '../api/swagger';
import { parseParamsToInterface, parseResponsesToInterface } from './format';
import { WriteQueue } from '../utils/queue';

export const fetchData = async () => {
    const { url } = await getConfig();
    return api.get(url);
}

export const swagger = async () => {
    const { paths, definitions, basePath }: any = await fetchData();

    const writeQueue = new WriteQueue();

    const queue: any[] = [];

    Object.keys(paths).forEach((k: string) => {
        Object.keys(paths[k]).forEach(async (k1) => {
            queue.push(async () => {
                const { include, exclude } = await getConfig();
                if (include.length && include.indexOf(k) === -1) return;

                if (exclude.length && exclude.indexOf(k) !== -1) return;
                const path = `${basePath}${k}.${k1}`;
                const parameInterface = await parseParamsToInterface(paths[k][k1].parameters, definitions, path);
                const resInterface = await parseResponsesToInterface(paths[k][k1].responses, definitions, path);

                const res = getNamespace(basePath + k, k1);
                if (!res) return;
                const { nameSpace } = res;

                console.log(nameSpace);

                const { allPropertiesRequired } = await getConfig();

                const content = `
                // ${path}
                declare namespace ${nameSpace} {
                    ${parameInterface}
                    ${allPropertiesRequired ? resInterface.replace(/\?/g, '') : resInterface}
                }`;

                writeQueue.push({
                    fileName: path.split('/')[2],
                    content
                });
            });
        });
    });

    await Promise.all(queue.map(cb => cb()));

    writeQueue.run();
}