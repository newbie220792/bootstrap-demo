import {HttpStatus} from './HttpStatus';

export const fetchGet = async (url, data) => {
    if (data) {
        url = url + '?' + new URLSearchParams(data).toString();
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
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: headers,
    }).then(res => {
        if (res.status === HttpStatus.UNAUTHORIZED) {
            window.location.reload();
            localStorage.removeItem('user');
        } else if (res.status === HttpStatus.SUCCESS) {
            return Promise.resolve(res.json());
        } else {
            throw new Error('Something went wrong with status code ' + res.status);
        }
    }).catch(err => (err));
};

export const fetchPost = async (url, data) => {
    // const navigate = useNavigate();
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': '*',
    };
    if (localStorage.getItem('access_token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    }
    return fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(data),
        headers: headers,
    }).then(res => {
        if (res.status === HttpStatus.UNAUTHORIZED) {
            window.location.reload();
            localStorage.removeItem('user');
        } else if (res.status === HttpStatus.SUCCESS) {
            return Promise.resolve(res.json());
        } else {
            throw new Error('Something went wrong with status code ' + res.status);
        }
    }).catch(err => (err));
};