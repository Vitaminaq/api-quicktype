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
                const path = `${basePath}${k}.${k1}`;
                const parameInterface = await parseParamsToInterface(paths[k][k1].parameters, definitions, path);
                const resInterface = await parseResponsesToInterface(paths[k][k1].responses, definitions, path);

                const res = getNamespace(basePath + k, k1);
                if (!res) return;
                const { nameSpace, fileName } = res;

                console.log(nameSpace, fileName);

                const content = `
                // ${path}
                declare namespace ${nameSpace} {
                    ${parameInterface}
                    ${resInterface}
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