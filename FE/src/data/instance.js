'use client'
import axios from "axios";
const endpoint=''
const instance = axios.create({
    baseURL: endpoint,
    headers: {
        Authorization: `Bearer ${typeof window !== "undefined" ? window.localStorage.getItem('token') : false}`,

    },
    // .. other options
});

export default instance;