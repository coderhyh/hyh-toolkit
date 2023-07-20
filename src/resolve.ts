import { ResolverResultObject } from 'unplugin-auto-import/types'

import * as hooks from './index'

export const HyhToolkitResolve = () =>
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
