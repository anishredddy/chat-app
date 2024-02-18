import getCurrentUser from "@/actions/get-current-user"
import {  NextResponse } from "next/server"

import  prisma  from "@/lib/prismadb"
import { pusherServer } from "@/lib/pusher"

export async function POST(
    req: Request,
    { params }: {
        params : {
            conversationId: string
        }
    }
) {
    try{
        const currentUser = await getCurrentUser()

        if(!currentUser?.id || !currentUser.email){
            return new NextResponse("unauthorised",{status:401})
        }

        const conversation = await prisma.conversation.findUnique({
            where:{
                id: params.conversationId
            },
            include:{
                messages: {
                    include:{
                        seen: true
                    }
                },
                users: true
            }
        })

        if(!conversation){
            return new NextResponse("invalid data",{status:500})
        }

        const lastMessage = conversation.messages[conversation.messages.length -1];


        if(!lastMessage){
            return NextResponse.json(conversation)
        }


        //update seen
        const updatedMessage= await prisma.message.update({
            where:{
                id: lastMessage.id
            },
            data:{
                seen:{
                    connect:{
                        id: currentUser.id
                    }
                }
            }
        })

        await pusherServer.trigger(currentUser.email!,'conversation:update',{
            id:params.conversationId,
            messages:[updatedMessage]
        });

        //check if alrady seen

        if(lastMessage.seenIds.indexOf(currentUser.id)!==-1){
            return NextResponse.json(conversation)
        }

        await pusherServer.trigger(params.conversationId!,'message:update',updatedMessage);

        return new NextResponse("success");

    }
    catch(error){
        console.error("CONVERSATION ID POST")
        return new NextResponse("error", {status:500})
    }
}