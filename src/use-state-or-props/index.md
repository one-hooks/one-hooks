---
title: useStateOrProps
nav:
  title: Hooks
  path: /hooks
group:
  title: 表单型
  path: /from
  order: 1
---

# useStateOrProps

表单型组件中的`value`，是可选的，传递时组件表现为`"受控"`。不传递时，也无须担忧,组件内部的状态依然会让它运行良好，此时只需要在 `onChange` 钩子里面接收变化。

```tsx
import React, { useCallback, useState } from 'react'
import { useStateOrProps } from '@one-hooks/one-hooks'

type Props = {
  onChange?: (value?: string) => void
  value: string
}
const WrapInput: React.FC<Props> = (props) => {
  const [v, change] = useStateOrProps(props, props.onChange, 'value', '')
  const onChange = useCallback<
    NonNullable<React.InputHTMLAttributes<HTMLInputElement>['onChange']>
  >(
    (e) => {
      change(e.target.value)
    },
    [change]
  )
  return <input value={v} onChange={onChange} />
}
export default () => {
  const [value, setState] = useState('')
  return (
    <>
      <p>Uncontrolled（非受控）</p>
      <WrapInput onChange={setState} />
      <p>Controlled（受控 - 常值 value='10'）</p>
      <WrapInput value='10' />
      <p>Controlled（受控 - 状态 setState） </p>
      <WrapInput value={value} onChange={setState} />
    </>
  )
}
```

## API

### 参数

| 参数位置 | 说明                          | 类型                         | 默认值    |
| -------- | ----------------------------- | ---------------------------- | --------- |
| 0        | `props` 必填                  | `T`                          | `{} as T` |
| 1        | `onChange` 必填               | `(newValue: T[key]) => void` | -         |
| 2        | `key` 'value' in `props` 可选 | `keyof T`                    | 'value'   |
| 3        | `initValue` 可选              | `T[key]`                     | -         |

### 返回值

| 返回值 | 说明  | 类型                         |
| ------ | ----- | ---------------------------- |
| 0      | value | `T[key]`                     |
| 1      | 突变  | `(newValue: T[key]) => void` |
