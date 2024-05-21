import {HttpStatus} from './HttpStatus';

export const fetchGet = async (url, data) => {
    if (data) {
        url = url + '?' + new URLSearchParams(data).toString();
    }
    const res = await fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Bearer ': localStorage.getItem('access_token'),
        }
    });
    if (res.status === HttpStatus.UNAUTHORIZED) {
        //todo: navigate to login page
        localStorage.removeItem('user_info');
    } else if (res.status === HttpStatus.SUCCESS) {
        return res.json();
    } else {
        throw new Error();
    }
};

export const fetchPost = async (url, data) => {
    const res = await fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Bearer ': localStorage.getItem('access_token'),
        }
    });
    if (res.status === HttpStatus.UNAUTHORIZED) {
        //todo: navigate to login page
        localStorage.removeItem('user_info');
    } else if (res.status === HttpStatus.SUCCESS) {
        return res.json();
    } else {
        throw new Error();
    }
};