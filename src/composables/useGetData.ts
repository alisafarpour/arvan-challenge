import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export const useGetData = <T>(
    key: string,
    endpoint: string
) => {

    return useQuery({
        queryKey: [key],
        queryFn: async (): Promise<T> => {
            const { data } = await axios.get(endpoint)
            return data
        },
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        retry: false,
    })
}