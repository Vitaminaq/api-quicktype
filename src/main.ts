import Api from './api';
import { create } from './create';
import { clean, mergeConfig } from './utils';
import { RequestQueue, WriteQueue } from './queue';

export default async () => {
    const { email, password, baseURL } = await mergeConfig();
    const api = new Api(baseURL);
    // login
    await api.login({
        email,
        password
    });

    const groups = await api.getGroupList();
    if (!groups || !groups.length) return;
    clean();

    const writeQueue = new WriteQueue();
    const requestQueue = new RequestQueue(writeQueue);

    groups.forEach(async (group: any) => {
        requestQueue.push({
            run: async() => {
                const { list } = await api.getProjectList({
                    group_id: group._id,
                    page: 1,
                    limit: 1000
                });
                if (!list || !list.length) return;
                list.forEach(async (project: any) => {
                    requestQueue.push({
                        run: async() => {
                            const interfacesData = await api.getInterfaceList({
                                project_id: project._id,
                                page: 1,
                                limit: 1000
                            });
                            const { list: interfaces } = interfacesData;
                            if (!interfaces || !interfaces.length) return;
                            interfaces.forEach(async (interF: any) => {
                                if (interF.status !== 'done') return;
                                requestQueue.push({
                                    run: async() => create(await api.getInterface({ id: interF._id }), writeQueue)
                                });
                            });
                        }
                    });
                });
            }
        });
    });
}
