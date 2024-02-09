import getCurrentUser from "@/actions/get-current-user"
import { NextResponse } from "next/server"

import prisma from "@/lib/prismadb"

export async function POST (
    req: Request
) {
    try{

        //to do - check group and make group

        const currentUser=await getCurrentUser();


        const body =await req.json();

        const {
            userId
        } = body;

        if(!currentUser ||  !currentUser?.id || !currentUser?.email){
            return new NextResponse("hacker hain hacker",{status:400})
        }

        //checking if there are existing conversations

        const existingConversations= await prisma.conversation.findMany({
            where:{
                OR:[
                    {
                        userIds:{
                            equals:[currentUser.id,userId]
                        }
                    },
                    {
                        userIds:{
                            equals:[userId,currentUser.id]
                        }
                    }
                ]
            }
        })

        const currentConversation = existingConversations[0];

        if(currentConversation){
            return NextResponse.json(currentConversation)
        }

        const newConversation = await prisma.conversation.create({
            data:{
                users:{
                    connect:[
                        {
                            id:currentUser.id
                        },
                        {
                            id:userId
                        }
                    ]
                }
            },
            include:{
                users:true
            }
        })

        return NextResponse.json(newConversation)

    }
    catch(error){
        console.log("CONVERSATION_POST_ERROR")
        return new NextResponse('internal error',{status:500})
    }
}