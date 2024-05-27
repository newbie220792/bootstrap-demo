import {HttpStatus} from './HttpStatus';

export const fetchGet = async (url, data) => {
    if (data) {
        url = url + '?' + new URLSearchParams(data).toString();
    }
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': '*',
        // 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
    if (localStorage.getItem('access_token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    }
    const res = await fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: headers,
    });
    if (res.status === HttpStatus.UNAUTHORIZED) {
        //todo: navigate to login page
        console.log('permission denied')
        localStorage.removeItem('user_info');
    } else if (res.status === HttpStatus.SUCCESS || res.status == '0') {
        return res.json();
    } else {
        throw new Error();
    }
};

export const fetchPost = async (url, data) => {
    // const navigate = useNavigate();
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': '*',
        // 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
    if (localStorage.getItem('access_token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    }
    const res = await fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(data),
        headers: headers,
    });
    if (res.status === HttpStatus.UNAUTHORIZED) {
        //todo: navigate to login page
        localStorage.removeItem('user_info');
        // navigate(LOGIN_PATH)
    } else if (res.status === HttpStatus.SUCCESS) {
        return res.json();
    } else {
        throw new Error();
    }
};