import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export const LoginScreen = () => {
    const { login } = useAuth()
    const apiUrl = process.env.REACT_APP_API_URL

    // 点击登录或注册触发的事件
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // 获取当前输入框的内容
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value

        login({ username, password })
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'}/>
        </div>
        <button type={'submit'}>登录</button>
    </form>
}