import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import Discord from "next-auth/providers/discord";

export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if (!user?.email) return false;

            if (account?.provider === "discord" && profile) {
                if (user.id) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            discordId: profile.id as string,
                            discordUsername: profile.username as string,
                        },
                    });
                }
            }

            return true;
        },
        async jwt({token, user, account, profile, trigger}) {
            if (user?.id) {
                token.uid = user.id;
            }

            if (token.uid) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.uid as string },
                    select: {
                        id: true,
                        role: true,
                        email: true,
                        discordId: true,
                    }
                });

                if (dbUser) {
                    token.uid = dbUser.id;
                    token.email = dbUser.email;
                    token.role = dbUser.role;
                    token.discordId = dbUser.discordId;
                }
            }

            return token;
        },
        async session({session, token}) {
            if (token?.uid) {
                session.user.id = token.uid as string;
                session.user.email = token.email as string;
                (session.user as any).role = token.role;
                (session.user as any).discordId = token.discordId;
                (session.user as any).discordUsername = token.discordUsername;
            }
            return session;
        },
    },
    events: {
        async createUser({user}) {
            if (!user?.id) return;
            console.log('Created user', user.id);
        },
    },
});