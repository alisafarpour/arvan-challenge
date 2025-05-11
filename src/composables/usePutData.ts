import axios from "axios";
import getEndPoint from "@/utility/getEndPoint.ts";
import {useMutation} from "@tanstack/vue-query";
import {getCookieValue} from "@/utility/getCookieValue.ts";

export const usePutData = <T,>(endpoint: string, mutationKey: string = 'put-data')  => {
    return useMutation({
        mutationKey: [mutationKey],
        mutationFn: (data:T) => axios.put(getEndPoint() + endpoint, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${getCookieValue('token')}`
            }
        }),
    })
}