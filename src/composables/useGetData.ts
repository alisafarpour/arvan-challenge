import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import getEndPoint from '@/utility/getEndPoint'
import { getCookieValue } from '@/utility/getCookieValue.ts'

export const useGetData = <T>(endpoint: string, key: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: async (): Promise<T> => {
      const { data } = await axios.get(getEndPoint() + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${getCookieValue('token')}`,
        },
      })
      return data
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  })
}
