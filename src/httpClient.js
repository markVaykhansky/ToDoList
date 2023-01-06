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
            const { data } = await this.axiosClient.post(url, payload);

            return data;
        } catch(err) {
            console.error("An error has occurred", err);
        }
        
    }
}


export const httpClient = new HttpClient();
