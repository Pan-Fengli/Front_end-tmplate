export default function makeURL(url, params = {}) {
    let newURL = new URL(url, window.location.origin);
    Object.keys(params).forEach(key => newURL.searchParams.append(key, params[key]));
    return newURL;
}
