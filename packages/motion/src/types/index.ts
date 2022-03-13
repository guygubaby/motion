import type { Ref } from 'vue-demi'

export type MaybeRef<T> = T | Ref<T>

export type Fn = () => void
