import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import getEndPoint from '@/utility/getEndPoint'
import { getCookieValue } from '@/utility/getCookieValue.ts'
import type {MaybeRef} from "vue";
import {computed, unref} from "vue";

export const useGetData = <T>(endpoint: MaybeRef<string>, key: string, dynamicKeys?: MaybeRef<(string | number)[]>) => {

  const reactiveEndpoint =  computed(() => unref(endpoint))
  const reactiveKeys = computed(() => [key, ...(unref(dynamicKeys) ?? [])])

  return useQuery({
    queryKey: reactiveKeys,
    queryFn: async (): Promise<T> => {
      const { data } = await axios.get(getEndPoint() + reactiveEndpoint.value, {
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
