import { CompleteConversationType } from "@/types/type";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser =(
    conversation : CompleteConversationType | { users : User[] }
) => {
    const session = useSession();

    const otherUser= useMemo(()=>{
        const currentEmail = session.data?.user?.email;

        const otherUser = conversation.users.filter((user)=> user.email !== currentEmail)

        return otherUser[0]
    },[session.data?.user?.email,conversation.users])

    return otherUser
}

export default useOtherUser