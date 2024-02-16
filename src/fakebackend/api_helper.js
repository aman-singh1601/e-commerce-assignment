import axios from 'axios';


//set token
const token  = JSON.parse(localStorage.getItem("token"));


export const API_URL = "https://dummyjson.com";

const axiosApi = axios.create({
  baseURL: API_URL,
});

if(token) axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;


export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}


export default axiosApi;

