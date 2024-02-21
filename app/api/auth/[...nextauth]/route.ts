
import NextAuth from "next-auth"

import { authOptions } from "@/utils/AuthOptions"

//moved auth options to a different folder to fix build issue

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'text' },
//         password: { label: 'password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Invalid credentials');
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email
//           }
//         });

//         if (!user || !user?.hashedPassword) {
//           throw new Error('Invalid credentials');
//         }

//         const isCorrectPassword:boolean = user.hashedPassword===credentials.password

//         if (!isCorrectPassword) {
//           throw new Error('Invalid credentials');
//         }

//         return user;
//       }
//     })
//   ],
//   debug: process.env.NODE_ENV === 'development',
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };