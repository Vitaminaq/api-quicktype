import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import chalk from 'chalk';

export default class BaseAxios {
    public axios: AxiosInstance;
    public constructor(baseURL: string) {
        this.axios = axios.create({
			baseURL,
			timeout: 6000,
			headers: {
				'Content-Type': 'application/json',
			},
		});
        this.onRequest();
        this.onResponse();
    }

    private onRequest() {
		this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
			config.headers = {
				...config.headers,
                cookie: global.cookie || []
			};
			return config;
		});
	}
	private onResponse() {
		this.axios.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, headers } = response;
				const { errcode, errmsg } = data;
                const cookie = headers['set-cookie'];
                if (cookie) {
                    global.cookie = cookie;
                }
                if (errcode !== 0)
				    console.log(chalk.red('[request error]'), errcode, errmsg);
				return data.data;
			},
			(error) => {
				console.log(chalk.red('[request error]'), error.request._options.path, error.code);
				return null;
			}
		);
	}
}

declare global { 
    var cookie: any;
}