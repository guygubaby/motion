import { getCurrentScope, onScopeDispose } from 'vue-demi'
import type { Fn } from '../types'

export const tryOnScopeDispose = (fn: Fn) => {
  const scope = getCurrentScope()
  scope && onScopeDispose(fn)
}
