import {HttpStatus} from './HttpStatus';
import store from '../stores/ReduxStore';
import {LoadingSlice} from '../stores/slices/LoadingSlice';
import {LOGIN_PATH} from './roles';

export const fetchGet = (url, param, isShowSpinner) => {
    return fetchCommon(url, null, 'GET', param, isShowSpinner);
};

export const fetchPost = async (url, data, param, isShowSpinner) => {
    return fetchCommon(url, data, 'POST', param, isShowSpinner);
};

const {actions: LoadingActions} = LoadingSlice;
export const fetchCommon = (url, data, method, param, isShowSpinner) => {
    if (isShowSpinner) {
        store.dispatch(LoadingActions.setIsLoading(true));
    }
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
                window.location.assign(LOGIN_PATH);
            }
            throw new Error(JSON.stringify({status: res.status, message: res.statusText}));
        } else {
            return res;
        }
    }).then((res) => res.json())
        .then(data => {
            if (!data) {
                throw new Error(JSON.stringify({
                    status: HttpStatus.BAD_REQUEST,
                    message: `No body found in response of url ${url}`
                }));
            }
            if (data.status === HttpStatus.UNAUTHORIZED) {
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                window.location.assign(LOGIN_PATH);
                throw new Error(JSON.stringify(data));
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