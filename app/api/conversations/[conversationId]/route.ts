import getCurrentUser from "@/actions/get-current-user"
import { NextResponse } from "next/server"

import prisma from "@/lib/prismadb"
import { pusherServer } from "@/lib/pusher"

export async function DELETE(
    req: Request,
    { params }: {
        params : {
            conversationId: string
        }
    }
){
    try{
        const currentUser=getCurrentUser();

        if(!currentUser){
            return new NextResponse("unauth",{status:401})
        }

        if(!params.conversationId){
            return new NextResponse("no data",{status:401})
        }

        const deletedConvo=await prisma.conversation.delete({
            where:{
                id: params.conversationId
            },
            include:{
                users:true
            }
        })

        if(!deletedConvo){
            return new NextResponse("invalid id",{status:500})
        }
        
        deletedConvo.users.map((user)=>{
            if(user.email){
                pusherServer.trigger(user.email,'conversation:deleted',deletedConvo)
            }
        })

        return NextResponse.json(deletedConvo)
    }
    catch{
        console.log("CONVERSSTION_DELETE_ERROR")

        return new NextResponse("error",{status:500})
    }
}