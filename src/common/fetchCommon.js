import {HttpStatus} from './HttpStatus';
import store from '../stores/ReduxStore';
import {LoadingSlice} from '../stores/slices/LoadingSlice';

export const fetchGet = (url, param) => {
    return fetchCommon(url, null, 'GET', param);
};

export const fetchPost = async (url, data, param) => {
    return fetchCommon(url, data, 'POST', param);
};

const {actions: LoadingActions} = LoadingSlice;
export const fetchCommon = (url, data, method, param) => {
    if (param) {
        url = url + '?' + new URLSearchParams(param).toString();
    }
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': '*',
    };
    if (localStorage.getItem('access_token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    }
    store.dispatch(LoadingActions.setIsLoading(true));
    return fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: method,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        body: data ? JSON.stringify(data) : null,
        headers: headers,
    }).then(res => {
        if (!res.ok) {
            if (res.status === HttpStatus.UNAUTHORIZED) {
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                window.location.reload();
            }
            throw new Error(JSON.stringify({status: res.status, message: res.statusText}));
        } else {
            return res;
        }
    }).then((res) => res.json())
        .then(data => {
            if (!data) {
                throw new Error('No body found in response of url ' + url);
            }
            if (data.status === HttpStatus.UNAUTHORIZED) {
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                window.location.reload();
                throw new Error('Authenticate fail:  ' + data.message);
            } else if (data.status === HttpStatus.SUCCESS) {
                return Promise.resolve(data);
            } else {
                throw new Error(JSON.stringify(data));
            }
        }).catch(err => {
            const error = JSON.parse(err.message);
            console.log(error.message);
            return Promise.resolve(error);
        }).finally(() => {
            store.dispatch(LoadingActions.setIsLoading(false));
        });
};