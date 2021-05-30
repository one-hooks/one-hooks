import { useCallback, useMemo, useState } from 'react'

export type Props = {
  value?: any
}
export type NoValueProps = {
  [key: string]: any
}
export type onChange<T> = (v: T | undefined) => void
export type Change<T> = React.Dispatch<React.SetStateAction<T | undefined>>
export function useStateOrProps<P extends Props, Key extends keyof P, T = P[Key]>(
  props: P,
  change: onChange<T> | undefined,
  key?: Key,
  initValue?: T
): [T | undefined, Change<T>]
export function useStateOrProps<P extends NoValueProps, Key extends keyof P, T = P[Key]>(
  props: P,
  change: onChange<T> | undefined,
  key: Key,
  initValue?: T
): [T | undefined, Change<T>]
export function useStateOrProps<P extends Props | NoValueProps, Key extends keyof P, T = P[Key]>(
  props: P = {} as P,
  change: onChange<T> | undefined,
  key: Key = 'value' as Key,
  initValue?: T
): [T | undefined, Change<T>] {
  const [stateValue, setStateValue] = useState<T | undefined>(initValue)
  const isPropsValue = useMemo(() => key in (props as any), [props, key])
  const value = useMemo(() => (isPropsValue ? props[key] : stateValue), [
    isPropsValue,
    props,
    key,
    stateValue,
  ])
  const onChange: Change<T> = useCallback(
    (e) => {
      setStateValue(e)
      change && change(e as T)
    },
    [change]
  )
  return [value as T, onChange]
}
