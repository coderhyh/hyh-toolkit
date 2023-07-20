// eslint-disable-next-line import/no-extraneous-dependencies
import { computed } from 'vue'

export const useVModel = <T extends Readonly<{ [k: string]: any }>, K extends keyof T>(
  props: T,
  key: K,
  emit: (...args: any[]) => void
) => {
  return computed({
    get() {
      return new Proxy(props[key], {
        set(obj, name, val) {
          emit(`update:${String(key)}`, { ...obj, [name]: val })
          return true
        }
      })
    },
    set(val) {
      emit(`update:${String(key)}`, val)
    }
  })
}
