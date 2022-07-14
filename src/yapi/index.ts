import chalk from 'chalk';
import Api from '../api/yapi';
import { create } from './create';
import { clean, getConfig } from '../utils/utils';
import { RequestQueue, WriteQueue } from '../utils/queue';

export const yapi = async () => {
    const { email, password, baseURL, all, limit, taskLimit } = await getConfig();
    const api = new Api(baseURL);
    // login
    const res = await api.login({
        email,
        password
    });
    if (!res) return;
    console.log(chalk.green('login success!!!'));

    const groups = await api.getGroupList();
    if (!groups || !groups.length) return;
    clean();

    const writeQueue = new WriteQueue();
    const requestQueue = new RequestQueue(writeQueue, taskLimit);

    groups.forEach(async (group: any) => {
        requestQueue.push({
            run: async () => {
                const { list } = await api.getProjectList({
                    group_id: group._id,
                    page: 1,
                    limit
                });
                if (!list || !list.length) return;
                list.forEach(async (project: any) => {
                    requestQueue.push({
                        run: async () => {
                            const interfacesData = await api.getInterfaceList({
                                project_id: project._id,
                                page: 1,
                                limit
                            });
                            const { list: interfaces } = interfacesData;
                            if (!interfaces || !interfaces.length) return;
                            interfaces.forEach(async (interF: any) => {
                                if (!all && interF.status !== 'done') return;
                                requestQueue.push({
                                    run: async () => create(await api.getInterface({ id: interF._id }), writeQueue)
                                });
                            });
                        }
                    });
                });
            }
        });
    });
}