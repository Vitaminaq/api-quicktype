import { getConfig } from '../utils/config';
import { getNamespace } from '../utils/utils';
import { api } from '../api/swagger';
import { parseAPIToInterface } from './format';
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
                if (include && include.length && include.indexOf(k) === -1) return;

                if (exclude && exclude.length && exclude.indexOf(k) !== -1) return;
                const path = `${basePath}${k}.${k1}`;

                const current = paths[k][k1];

                const apiInterface = await parseAPIToInterface(current, definitions, path);

                const res = getNamespace(basePath + k, k1);
                if (!res) return;
                const { nameSpace } = res;

                const content = `
                // ${path}
                declare namespace ${nameSpace} {
                    ${apiInterface}
                }`;

                writeQueue.push({
                    fileName: nameSpace.split('.')[1],
                    content
                });
            });
        });
    });

    await Promise.all(queue.map(cb => cb()));

    writeQueue.run();
}