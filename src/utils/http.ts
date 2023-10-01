import qs from "qs"
import * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL

interface config extends RequestInit {
    data?: object,
    token?: string
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: config) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    // 疑问，为什么fetch请求返回ppromise后then函数里面只有一个成功的回调函数（这个回调函数只有在服务器响应请求后才会调用，即请求成功后，无论状态码是什么）
    // axios与fetch的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常。而fetch只能在then的成功函数里面手动抛出
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
        if (response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({ message: '请重新登录' })
        }
        
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}