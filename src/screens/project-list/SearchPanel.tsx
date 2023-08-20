import { useEffect, useState } from "react"
import React from 'react'

// user是什么类型的呢，这个一般是要去看官方文档的
export interface User{
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
}

interface SearchPanelProps{
    users:User[],
    param:{
        name:string,
        personId:string
    },
    setParam:(param:SearchPanelProps['param'])=>void
}

// 搜索框
export const SearchPanel = ({ users, param, setParam }:SearchPanelProps) => {

    return <form action="">
        <div>
            {/* param参数的name属性，是通过输入框修改的 */}
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            {/* param参数的personId属性，是通过下拉菜单的选择框修改的 */}
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    users.map((user, index) => {
                        return <option value={user.id} key={index}>{user.name}</option>
                    })
                }
            </select>
        </div>
    </form>
}