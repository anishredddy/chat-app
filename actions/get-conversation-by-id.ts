import prisma from "@/lib/prismadb"

const getConversationById = async (id: string) =>{
    if(!id){
        return null
    }
    try{
        const conversation=await prisma.conversation.findUnique({
            where:{
                id
            },
            include:{
                users: true,
                messages:{
                    include:{
                        sender: true,
                        seen: true
                    }
                }
            }
        })

        return conversation;
    }
    catch(error:any){
        console.log("GET CONVERSATION ACTION ERROR")
        return null;
    }
    
}

export default getConversationById