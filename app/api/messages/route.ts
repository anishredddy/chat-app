import getCurrentUser from "@/actions/get-current-user"
import { NextResponse } from "next/server"

import prisma from "@/lib/prismadb"

export async function POST(
    req: Request
){
    try{
        const currentUser=await getCurrentUser()

        if(!currentUser?.id || !currentUser.email){
            return new NextResponse("unauthoried",{status:401})
        }

        const body=await req.json();

        const {
            message,
            image,
            conversationId
        } = body;

        if(!conversationId){
            return new NextResponse("invalid data",{status:400})
        }

        const newMessage= await prisma.message.create({
            data:{
                body:  message,
                image: image,
                conversation: {
                    connect : {
                        id: conversationId
                    }
                },
                sender:{
                    connect:{
                        id:currentUser.id
                    }
                },
                seen:{
                    connect:{
                        id: currentUser.id
                    }
                }
            }
        })

        const updatedConversation=await prisma.conversation.update({
            where:{
                id: conversationId
            },
            data:{
                lastMessageAt: new Date(),
                messages:{
                    connect:{
                        id: newMessage.id
                    }
                }
            },
            include:{
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })


        return NextResponse.json(newMessage)
    }
    catch(error){
        console.error("messagee post")
        return new NextResponse("something went wrong",{status:500})
    }
}