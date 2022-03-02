import type { Fn } from '@bryce-loskie/utils'
import { getCurrentScope, onScopeDispose } from 'vue'

export const tryOnScopeDispose = (fn: Fn) => {
  const scope = getCurrentScope()
  scope && onScopeDispose(fn)
}
