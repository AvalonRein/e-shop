import axios from "axios";
const endpoint='http://localhost:3333/api/'
const instance = axios.create({
    baseURL: endpoint,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,

    },
    // .. other options
});

export default instance;