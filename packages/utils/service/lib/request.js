const axios = require('axios')

// console.log('service 被调用了 process.env.NODE_ENV', process.env.NODE_ENV)

let BASE_URL = ''

if (process.env.NODE_ENV === 'prd') {
    BASE_URL = 'http://1.117.67.249:3344'
} else if (process.env.NODE_ENV === 'dev') {
    BASE_URL = 'http://localhost:3333'
}

class Request {
    constructor() {
        this.service = axios.create({
            baseURL: BASE_URL,
            timeout: 5000,
        })

        this.service.interceptors.response.use(
            response => {
                const { data } = response
                const { errno, message } = data
                if (errno === 0) {
                    return data
                }
                return Promise.reject(message)
            },
            error => {
                return Promise.reject(error)
            }
        )
    }

    get(url, params = {}, headers = {}) {
        return this.service({
            url,
            params,
            method: 'get',
            headers,
        })
    }

    post(url, data = {}, headers = {}) {
        return this.service({
            url,
            data,
            method: 'post',
            headers,
        })
    }
}

module.exports = Request
