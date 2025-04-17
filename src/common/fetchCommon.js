import {HttpStatus} from './HttpStatus';
import store from '../stores/ReduxStore';
import {LoadingSlice} from '../stores/slices/LoadingSlice';
import {LOGIN_PATH} from './roles';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "./constants";

export const fetchGet = (url, param, isShowSpinner) => {
    return fetchCommon(url, null, 'GET', param, isShowSpinner);
};

export const fetchPost = async (url, data, param, isShowSpinner) => {
    return fetchCommon(url, data, 'POST', param, isShowSpinner);
};

const getRefreshToken = () => {
    const param = {
        accessToken: localStorage.getItem(ACCESS_TOKEN),
        refreshToken: localStorage.getItem(REFRESH_TOKEN)
    };
    const url = process.env.REACT_APP_WEB_SERVICE_URL + '/auth/refresh-token' + '?' + new URLSearchParams(param).toString();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': '*',
    };
    return fetch(url, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        body: null,
        headers: headers,
    }).then(res => {
        if (!res.ok) {
            throw new Error(JSON.stringify({status: res.status, message: res.statusText}));
        } else {
            return res;
        }
    }).then((res) => res.json())
        .then(data => {
            if (data && data.status === HttpStatus.SUCCESS) {
                localStorage.setItem(ACCESS_TOKEN, data.data.accessToken);
                localStorage.setItem(REFRESH_TOKEN, data.data.refreshToken);
                return Promise.resolve(data);
            } else {
                throw new Error(JSON.stringify(data));
            }
        }).catch(error => {
            window.location.assign(LOGIN_PATH);
            return Promise.reject(error);
        });
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
    if (localStorage.getItem(ACCESS_TOKEN) && !url.includes('/logout')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }

    return fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: method,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        body: data ? JSON.stringify(data) : null,
        headers: headers,
    }).then(res => {
        if (!res.ok) {
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
                throw new Error(JSON.stringify(data));
            } else if (data.status === HttpStatus.SUCCESS) {
                return Promise.resolve(data);
            } else {
                throw new Error(JSON.stringify(data));
            }
        }).catch(err => {
            const error = JSON.parse(err.message);
            if (error.status === HttpStatus.UNAUTHORIZED && localStorage.getItem(ACCESS_TOKEN)) {
                return getRefreshToken().then(res => {
                    if (res.status === HttpStatus.SUCCESS) {
                        return fetchCommon(url, data, method, param, isShowSpinner);
                    }
                });
            } else {
                console.log(error.message);
                return Promise.reject(error);
            }
        }).finally(() => {
            store.dispatch(LoadingActions.setIsLoading(false));
        });
};