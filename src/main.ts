import Api from './api';
import { create } from './create';
import { clean, mergeConfig } from './utils';

export default async () => {
    const { email, password, baseURL } = await mergeConfig();
    const api = new Api(baseURL);
    // login
    await api.login({
        email,
        password
    });

    const groups = await api.getGroupList();
    clean();
    groups.forEach(async (group: any) => {
        const projectsData = await api.getProjectList({
            group_id: group._id,
            page: 1,
            limit: 1000
        });
        const { list } = projectsData;
        if (!list || !list.length) return;
        list.forEach(async (project: any) => {
            const interfacesData = await api.getInterfaceList({
                project_id: project._id,
                page: 1,
                limit: 1000
            });
            const { list: interfaces } = interfacesData;
            if (!interfaces || !interfaces.length) return;
            interfaces.forEach(async (interF: any) => {
                create(await api.getInterface({ id: interF._id }));
            })
        })
    });
}
