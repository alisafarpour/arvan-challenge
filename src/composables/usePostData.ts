import axios from "axios";
import getEndPoint from "@/utility/getEndPoint.ts";
import {useMutation} from "@tanstack/vue-query";
import {getCookieValue} from "@/utility/getCookieValue.ts";

export const usePostData = <T, R = unknown>(
    endpoint: string,
    mutationKey: string = 'post-data'
) => {

    return useMutation<R, Error, T>({
        mutationKey: [mutationKey],
        mutationFn: (data: T) =>
            axios.post<R>(getEndPoint() + endpoint, data,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${getCookieValue('token')}`
                }
            }).then(res => res.data)
    });
};