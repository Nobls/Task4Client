import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3157'
})

export default instance
