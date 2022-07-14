import { BaseMethod } from './';

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

class YapiApi extends BaseMethod {
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

export default YapiApi;
