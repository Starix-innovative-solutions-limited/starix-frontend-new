/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export function useSocials() {
    return useQuery({
        queryKey: ["socials"],
        queryFn: async () => {
            const { data } = await api.get("/integrations");
            return data?.data;
        },
    });
}
