import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

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
				const { errcode } = data; // errmsg
                const cookie = headers['set-cookie'];
                if (cookie) {
                    global.cookie = cookie;
                }
                // console.log(errcode, errmsg);
                if (errcode !== 0) return process.exit(1);
				return data.data;
			},
			(error) => {
				console.log('error：', error.code);
				return process.exit(1);
			}
		);
	}
}

declare global { 
    var cookie: any;
}