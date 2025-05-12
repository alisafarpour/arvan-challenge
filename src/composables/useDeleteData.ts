import axios from 'axios'
import getEndPoint from '@/utility/getEndPoint.ts'
import { useMutation } from '@tanstack/vue-query'
import { getCookieValue } from '@/utility/getCookieValue.ts'
import { computed, type MaybeRef, unref } from 'vue'

export function useDeleteData(endpoint: MaybeRef<string>, mutationKey: string = 'delete-data') {
  const reactiveEndpoint = computed(() => unref(endpoint))
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data?: any) =>
      axios.delete(getEndPoint() + reactiveEndpoint.value, {
        headers: { Authorization: `Token ${getCookieValue('token')}` },
        ...(!!data && { data }),
      }),
  })
}
