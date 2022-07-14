import BaseAxios from '../utils/request';

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