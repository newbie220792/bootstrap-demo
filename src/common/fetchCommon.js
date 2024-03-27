export const fetchGet = async (url, data) => {
    if (data) {
        url = url + '?' + new URLSearchParams(data).toString();
    }
    const res = await fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: 'GET',
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // body: JSON.stringify({}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (res.ok) {
        return res.json()
    } else {
        throw new Error()
    }
}

export const fetchPost = async (url, data) => {
    const res = await fetch(process.env.REACT_APP_WEB_SERVICE_URL + url, {
        method: 'POST',
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (res.ok) {
        return res.json()
    } else {
        throw new Error()
    }
}

export const fetchPostImage = async (url, data) => {
    const res = await fetch('https://global-image-search-with-keywords.p.rapidapi.com/v1/google_Image_Search/', {
        method: 'POST',
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '3c0615783cmsh481038da7100fd8p15fd56jsnaa3308db5f93',
            'X-RapidAPI-Host': 'global-image-search-with-keywords.p.rapidapi.com'
        },
        body: JSON.stringify({
            keywords: 'compare',
            count: 1
        })
    })
    try {
        const result = await res.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    // if (res.ok) {
    //     return res.json()
    // } else {
    //     throw new Error()
    // }
}