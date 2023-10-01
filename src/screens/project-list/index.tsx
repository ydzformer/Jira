// 这个主题文件的作用就是展示用户列表信息
import React, { useEffect, useState } from 'react'
import qs from 'qs';
import List from './List'
import { SearchPanel } from './SearchPanel'
import { cleanObject, useMount, useDebounce } from 'utils'

export default function ProjectListScreen() {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const apiUrl = process.env.REACT_APP_API_URL
  const debounceParam = useDebounce(param, 1000)
  
  // 请求数据
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())      
      }
    })
  })

  // 当搜索框的用户的配置信息发生变化的时候，我们需要获取对应的列表信息
  useEffect(() => {
    // 使用 fetch() 发送网络请求时，返回的 Promise 对象会在请求完成后解析为一个 Response 对象。Response 对象代表了从服务器接收到的完整响应，
    // 它提供了许多方法和属性来访问响应的各个方面。
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    }).catch(()=>{
      alert("error happen")
    })
  }, [debounceParam])

  return (
    <div>
      <List users={users} list={list} />
      <SearchPanel users={users} param={param} setParam={setParam} />
    </div>
  )
}
