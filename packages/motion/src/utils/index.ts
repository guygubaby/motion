import type { Fn } from '@bryce-loskie/utils'
import { getCurrentScope, onScopeDispose } from 'vue-demi'

export const tryOnScopeDispose = (fn: Fn) => {
  const scope = getCurrentScope()
  scope && onScopeDispose(fn)
}
