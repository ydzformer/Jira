import React from 'react'
import { User } from './SearchPanel'

interface Project{
    id:string,
    name:string,
    personId:string,
    pin:boolean,
    organization:string,
}

interface ListProps{
    list:Project[],
    users:User[],
}

export default function List({ users, list }:ListProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((project) => {
                        return <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}
