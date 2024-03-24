export const fetchGet = async (url, data) => {
    if (data) {
        url = url + '?' + new URLSearchParams(data).toString();
    }
    const res = await fetch('http://192.168.1.89:9090/api/v1' + url, {
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
    const res = await fetch('http://192.168.1.89:9090/api/v1' + url, {
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