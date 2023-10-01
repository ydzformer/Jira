// 这个文件是用于将用户登录数据存储在状态里面的文件
import React, { ReactNode, useState } from "react"
import * as auth from 'auth-provider'
import { User } from "screens/project-list/SearchPanel"

interface AuthForm {
    username: string,
    password: string
}
// 创建一个Context池子
const AuthContext = React.createContext<
    {
        user: User | null,
        login: (form: AuthForm) => Promise<void>,
        register: (form: AuthForm) => Promise<void>,
        logout: () => Promise<void>
    } | undefined
>(undefined)
// 这里的displayName属性就是用于在测试开发过程中作为一个标识，让我们更好的去找到他。
AuthContext.displayName = 'AuthContext'

// 进行逻辑处理
export const AuthProvider = ({children}:{children:ReactNode}) => {
    // useState的类型推断，下面的user这个state的数据类新会与传递给useState的初始值相同。所以，会判断为null
    const [user, setUser] = useState<User | null>(null)
    // 后端返回的数据是User类型的
    // const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    // const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))

    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)

    const logout = () => auth.logout().then(user => setUser(null))
   
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = ()=>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在context中使用')
    }
    return context
}