import * as url from './url_helper';
import {get, post} from './api_helper';
import axios from 'axios';


//authentication methods
export const login = (data) => post(url.USER_LOGIN, data);


export const isuserloggedin = () => {
    return get(url.GET_AUTH_USER)
        .then(response => {
            if (response.status >= 200 || response.status <= 299) return response.data;
            throw response.data;
            } )
        .catch(err => {
            let message;
            if (err.response && err.response.data.message === "Authentication Problem") message = "Authentication Problem";
            throw message;
        })
};

//product methods

export const getproducts = (skip, limit) => get(url.GET_PRODUCTS + `/?limit=${limit}&skip=${skip}`);
export const searchproducts = (skip, limit, product) => get(url.GET_PRODUCTS + `/search?limit=${limit}&skip=${skip}&q=${product}`);
