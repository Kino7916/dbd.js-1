const axios = require("axios").default;

class HttpRequest {
    constructor() {
        this.headers = { }
    }

    get(url) {
        return axios.get(url, {
            headers: this.headers
        }).catch(err => err.message)
    }

    post(url, body) {
        return axios.post(url, body, {
            headers: this.headers
        }).catch(err => err.message)
    }

    patch(url, body) {
        return axios.patch(url, body, {
            headers: this.headers
        }).catch(err => err.message)
    }

    delete(url) {
        return axios.delete(url, {
            headers: this.headers
        })
    }
}

module.exports = new HttpRequest();