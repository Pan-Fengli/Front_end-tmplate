const baseURL = "http://localhost:8080";

function makeURL(url, params = {}) {
    let newURL = new URL(url, window.location.origin);
    Object.keys(params).forEach(key => newURL.searchParams.append(key, params[key]));
    return newURL;
}


function handleRtn(rsp, callback) {
    if (rsp.code === 0) {
        callback(rsp.data);
    } else {
        alert(rsp.message);
        if (rsp.message.indexOf("请先登录") >= 0) {
            window.location.href = "/logIn";
        }
    }
}

let postFetch = (url, body, callback) => {
    let completeURL = baseURL + url;
    fetch(completeURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: 'include'
    }).then(rsp => rsp.json().then(rsp => {
        handleRtn(rsp, callback);
    }))
};

let deleteFetch = (url, body, callback) => {
    let completeURL = baseURL + url;
    fetch(completeURL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: 'include'
    }).then(rsp => rsp.json().then(rsp => {
        handleRtn(rsp, callback);
    }))
};

let getFetch = (url, params, callback) => {
    let completeURL = makeURL(baseURL + url, params).href;
    fetch(completeURL, {
        method: "GET",
        credentials: 'include',
    }).then(rsp => rsp.json().then(rsp => {
        handleRtn(rsp, callback);
    }));
    // let completeURL = baseURL + url;
    // axios.get(completeURL, {
    //     params: params,
    //     headers: {
    //         'Authorization': "Bearer " + sessionStorage.getItem("token")
    //     }
    // }).then((rsp) => callback(rsp));
};

export {postFetch, deleteFetch, getFetch}
