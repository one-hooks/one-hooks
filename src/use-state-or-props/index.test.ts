import { renderHook, act } from '@testing-library/react-hooks'
import { useMemo, useState } from 'react'
import { useStateOrProps } from './index'

const initValue = 'hello world'
const newValue = 'hello world2'

function useProps(initValue?: string, initUseProps: boolean = true) {
  const [value, setValue] = useState<string | undefined>(initValue)
  const [usePropsValue, setUsePropsValue] = useState(initUseProps)
  const props = useMemo<{ value?: string }>(() => (usePropsValue ? { value } : {}), [
    usePropsValue,
    value,
  ])
  const [r, onChange] = useStateOrProps(props, setValue)
  return [r, onChange, setUsePropsValue]
}

describe('useStateOrProps', () => {
  it('defined', () => {
    expect(useStateOrProps).toBeDefined()
  })

  it('initValue', async () => {
    const { result } = renderHook(() => useProps(initValue))
    expect(result.current[0]).toStrictEqual(initValue)
    act(() => {
      ;(result.current[1] as any)(newValue)
    })
    expect(result.current[0]).toStrictEqual(newValue)
    act(() => {
      ;(result.current[1] as any)(undefined)
    })
    expect(result.current[0]).toStrictEqual(undefined)
  })

  it('toggle props / state', () => {
    const { result } = renderHook(() => useProps(initValue))
    expect(result.current[0]).toStrictEqual(initValue)
    act(() => {
      ;(result.current[1] as any)(newValue)
    })
    expect(result.current[0]).toStrictEqual(newValue)
    // 突变成使用内部状态
    act(() => {
      ;(result.current[2] as any)(false)
    })
    expect(result.current[0]).toStrictEqual(newValue)
    act(() => {
      ;(result.current[1] as any)(initValue)
    })
    expect(result.current[0]).toStrictEqual(initValue)
  })
})
