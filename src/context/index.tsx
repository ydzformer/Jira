import React,{ ReactNode } from "react";

import { AuthProvider } from "./auth-context";
// 入口文件
export const AppProviders = ({children}:{children:ReactNode})=>{
    // return <AuthProvider children={children}/>上下等效，下面的写法还可以嵌套。
    return <AuthProvider>
        {children}
    </AuthProvider>
}