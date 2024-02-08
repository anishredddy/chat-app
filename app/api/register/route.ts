import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function POST(
    req: Request
){
    try{
        const body= await req.json();
        const{
            email,
            name,
            password
        } = body

        if(!email || !name || !password){
            return new NextResponse('Missing data bro',{status:400})
        }

        const user= await prisma.user.create({
            data:{
                email,
                name,
                hashedPassword: password
            }
        })

        return NextResponse.json(user)
    }
    catch(error){
        console.log("REGISTRATION ERROR")
        return new NextResponse("internal error",{status:500})
    }
}