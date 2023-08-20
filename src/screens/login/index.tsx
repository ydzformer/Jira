import React, { FormEvent } from "react";

export const LoginScreen = ()=>{
    const apiUrl = process.env.REACT_APP_URL
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const login = (param:{username:string,password:string})=>{
        // fetch(`${apiUrl}/login`,{
            
            fetch('http://localhost:3001/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(param),
        }).then(async response => {
            if (response.ok) {
                console.log(';执行了几次呢');
            }
        })
    }

    function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        login({username,password})
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'}/>
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'} />
        </div>
        <button type={'submit'}>注册</button>
    </form>
}