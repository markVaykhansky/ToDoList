import axios from 'axios';

class HttpClient {
    constructor() {
        this.axiosClient = new axios.Axios({ 
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
    }

    async get(url) {
        const { data } = await this.axiosClient(url);
        return data;
    }

    async post(url, body) {
        try {
            const payload = !!body ? JSON.stringify(body) : undefined;
            debugger;
            const { data } = await this.axiosClient.post(url, payload);
            debugger;

            return data;
        } catch(err) {
            debugger;
            console.error("An error has occurred", err);
        }
        
    }
}


export const httpClient = new HttpClient();
