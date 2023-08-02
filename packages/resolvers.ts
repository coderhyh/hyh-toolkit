import type { ResolverResultObject } from 'unplugin-auto-import/types'

import * as hyh from './index'

export const HyhToolkitResolvers = () =>
  <ResolverResultObject>{
    type: 'component',
    resolve: (name: keyof typeof hyh) => {
      if (hyh[name]) {
        return {
          name,
          as: name,
          from: 'hyh-toolkit'
        }
      }
    }
  }
