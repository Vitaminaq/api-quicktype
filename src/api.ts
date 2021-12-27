import BaseAxios from './request';

export class BaseMethod extends BaseAxios {
    public async get<P extends { [key: string]: any }, R>(
        url: string,
        params?: P
    ): Promise<R> {
        return this.axios.get(url, {
            params,
        });
    }
    public async post<P, R>(
        url: string,
        params?: P,
    ): Promise<R> {
        return this.axios.post(url, params);
    }
}

interface LoginParams {
    email: string;
    password: string;
}
interface ListParams {
    page: number;
    limit: number;
}
interface GetProjectListParams extends ListParams {
    group_id: number;
}
interface GetInterfaceListParams extends ListParams {
    project_id: number;
}
interface InterfaceParams {
    id: number;
}

class Api extends BaseMethod {
    /**
     * 登录
     */
    public login(params: LoginParams) {
        return this.post('/api/user/login', params);
    }
    public getGroupList(): Promise<any> {
        return this.get('/api/group/list');
    }
    public getProjectList(params: GetProjectListParams): Promise<any> {
        return this.get('/api/project/list', params)
    }
    public getInterfaceList(params: GetInterfaceListParams): Promise<any> {
        return this.get('/api/interface/list', params)
    }
    public getInterface(params: InterfaceParams): Promise<any> {
        return this.get('/api/interface/get', params)
    }
}

export default Api;
