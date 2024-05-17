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
    if (res.status === 401) {
        //todo: navigate to login page
        localStorage.removeItem('access_token');
    } else if (res.status === 200) {
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
    if (res.status === 401) {
        //todo: navigate to login page
        localStorage.removeItem('access_token');
    } else if (res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
};