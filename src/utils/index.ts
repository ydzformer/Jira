import _ from 'lodash'
import { useEffect, useState } from 'react';
// 用于判断是否为零。
export const isFalsy = (value:unknown) => value === 0 ? false : !value

// 在这里面写一个函数，用于清空数组里面的空对象。注意：在一个函数里，改变传入的对象本身是不好的。
export const cleanObject = (object:object) => {
    // 等价于object.assign({},)
    const result = _.cloneDeep(object)
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        // 在隐式转换中，0会被认为是false，会被误剔除，所以我们要提保留为零的数。
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback:()=>void) => {
    useEffect(() => {
        callback()
    }, [])
}

// useDebounce--防抖函数，当我们在输入框输入文字的时候，会不断出发useEffect函数，导
// 致前端向服务器发送了多次fetch请求导致性能下降
export const useDebounce =<V> (value:V, delay?:number) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => { setDebounceValue(value) }, delay)
        // return 函数的作用:在组件卸载或下次执行副作用前执行清理操作
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue
}