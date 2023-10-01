// 这个文件的作用是用于请求登录、注册、退出接口的API的文件，且将登录的用户信息态，存储在localStorage中。
import {User} from "screens/project-list/SearchPanel"

const localStorageKey = '__auth_provider_token'

const apiUrl = process.env.REACT_APP_API_URL

export const getToken = ()=> window.localStorage.getItem(localStorageKey)
// 这个方法是用于将用户的数据存储在tokens里面的方法
export const handleUserResponse = ({user}:{user:User})=>{
    window.localStorage.setItem(localStorageKey,user.token||'')
    return user
}

export const login  = (data:{username:string,password:string})=>{
    return fetch(`${apiUrl}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    }).then(async (response:Response)=>{
        if(response.ok){
            // 将登录接口登录成功响应的数据解析成JSON格式的数据。
            return handleUserResponse(await response.json())
        }else{
            // 这个等同于throw new Error(),让他报错，而不是返回undefined，你可以把这段代码删掉，就可以看到login函数的
            // 签名返回值就是undefined和User了。
            return Promise.reject(data)
        }
    })
}

export const register  = (data:{username:string,password:string})=>{
   return fetch(`${apiUrl}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
    }).then(async (response:Response)=>{
        if(response.ok){
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(data)
        }
    })
}

export const logout =async ()=> window.localStorage.removeItem(localStorageKey)