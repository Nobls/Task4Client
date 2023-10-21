import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5555'
})

instance.interceptors.request.use((config) => {

        config.headers = config.headers ?? {};

        config.headers.Authorization = window.localStorage.getItem('token')

        return config
    }
)

export default instance
