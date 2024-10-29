import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            username: string | null;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        image: string;
        username: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.picture as string;
                session.user.username = token.username as string;
            }

            return session;
        },

        // управляет созданием и обновлением токенов, проверяет наличие пользователя в базе данных и создает нового, если он не найден.
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email as string
                },
            });

            if (!dbUser) {
                token.id = user!.id;
                return token;
            }

            if (!dbUser.username) {
                await db.user.update({
                    where: {
                        id: dbUser.id
                    },
                    data: {
                        username: nanoid(10)
                    },
                });
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username,
            };
        },

        async redirect({ url, baseUrl }) {
            console.log('Redirecting to:', url);
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
};

export const getAuthSession = () => getServerSession(authOptions);
