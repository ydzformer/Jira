import React from "react"
import { useAuth } from "context/auth-context"
import ProjectListScreen from "screens/project-list"

export const AuthenticatedApp = () => {
    const {logout} = useAuth()

    return <div>
        <ProjectListScreen></ProjectListScreen>
        <button onClick={logout}>退出登录</button>
    </div>
}