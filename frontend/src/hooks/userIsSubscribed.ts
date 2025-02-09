import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export function userIsSubscribed(){
    const user = useQuery(api.users.getUser);
    return user && (user.endsOn ?? 0) > Date.now()
}