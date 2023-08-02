import type { ResolverResultObject } from 'unplugin-auto-import/types'

import * as hooks from '../../vue-hooks'

export const HyhToolkitResolvers = () =>
  <ResolverResultObject>{
    type: 'component',
    resolve: (name: keyof typeof hooks) => {
      if (hooks[name]) {
        return {
          name,
          as: name,
          from: 'hyh-toolkit'
        }
      }
    }
  }
