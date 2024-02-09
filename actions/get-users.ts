import prisma from "@/lib/prismadb"

import getSession from "./get-session"

const getUsers = async () => {
    const session=await getSession();

    if(!session?.user?.email){
        return [];
    }

    try{
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            where:{
                NOT:{
                    email:session.user.email
                }
            },
            take: 10
        })

        return users
    }
    catch(error){
        console.log("error in get-user action ,",error)
        return []
    }
}

export default getUsers