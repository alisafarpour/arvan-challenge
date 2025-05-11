import axios from 'axios'
import getEndPoint from '@/utility/getEndPoint.ts'
import { useMutation } from '@tanstack/vue-query'
import { getCookieValue } from '@/utility/getCookieValue.ts'

export function useDeleteData(endpoint: string, mutationKey: string = 'delete-data') {
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data?: any) =>
      axios.delete(getEndPoint() + endpoint, {
        headers: { Authorization: `Token ${getCookieValue('token')}` },
        ...(!!data && { data }),
      }),
  })
}
