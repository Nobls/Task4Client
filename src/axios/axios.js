import axios from "axios";

const instance = axios.create({
    baseURL: 'https://task4-server-nine.vercel.app'
})

instance.interceptors.request.use((config) => {

        config.headers = config.headers ?? {};

        config.headers.Authorization = window.localStorage.getItem('token')

        return config
    }
)

export default instance
