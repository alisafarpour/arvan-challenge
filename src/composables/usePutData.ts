import axios from 'axios'
import getEndPoint from '@/utility/getEndPoint.ts'
import { useMutation } from '@tanstack/vue-query'
import { getCookieValue } from '@/utility/getCookieValue.ts'
import { computed, type MaybeRef, unref } from 'vue'

export const usePutData = <T>(endpoint: MaybeRef<string>, mutationKey: string = 'put-data') => {
  const reactiveEndpoint = computed(() => unref(endpoint))
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data: T) =>
      axios.put(getEndPoint() + reactiveEndpoint.value, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${getCookieValue('token')}`,
        },
      }),
  })
}
