import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      //splits where theres a space and it will join it
      session.user.tag = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

        session.user.uid = token.sub;
        return session;
    },
  },
  secret: process.env.SECRET,
  jwt:{
    secret: process.env.AUTH_SECRET,
    encryption: true,
    signingKey: {"kty":"oct","kid":"nbcNUIB6u3IYMhifplPvNAZ1JgPGNKtkR3Jgtg5XQh0","alg":"HS512","k":"du0Mv1n39ZSPUVKLiHhFQVxUmAitWPJoqldh1MWM8eE5DX-shAbMJ--LwMONeKEWOpzgDHgqBnvw-yfd6GUA7A"},
    encryptionKey: {"kty":"oct","kid":"tD3zf2FdW-MC22g8v5WH5XCQVSfGLaYmses2lkqsjP4","alg":"HS512","k":"vMcEUbmCXUc1GAgeXgaHvxKrAbdSdIxIjbjczMEDZtqR3DOoUNachzzx7gLr_3vOqPx5c2tA-3Ou7RT7CQVXtg"}  
  },
});
