import getCurrentUser from "./get-current-user"

import prisma from "@/lib/prismadb"

const getConversations =async () => {
    const currentUser=await getCurrentUser();

    if(!currentUser?.id){
        return []
    }

    try{
        const conversations=await prisma.conversation.findMany({
            orderBy:{
                lastMessageAt: 'desc'
            },
            where:{
                userIds:{
                    has: currentUser.id
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        sender: true,
                        seen: true
                    },
                    orderBy:{
                        createdAt: 'desc'
                    }
                }
            }
        })


        return conversations
    }
    catch(error){
        console.log("Error in get conversations action")
        return []
    }
}

export default getConversations