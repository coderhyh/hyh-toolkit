import { computed } from 'vue'
export const useVModel = <T extends Readonly<{ [k: string]: any }>, K extends keyof T>(
  props: T,
  key: K,
  emit: (...args: any[]) => void
) => {
  return computed({
    get() {
      if (typeof props[key] === 'object') {
        return new Proxy(props[key], {
          set(obj, name, val) {
            emit(`update:${String(key)}`, { ...obj, [name]: val })
            return true
          }
        })
      }
      return props[key]
    },
    set(val) {
      emit(`update:${String(key)}`, val)
    }
  })
}
