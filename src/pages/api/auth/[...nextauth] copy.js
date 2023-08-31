import axios from "axios";
import { useEffect } from "react"; // Add this line
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { setCookie } from 'nookies';



const nextAuthOptions = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        scope:"email",
      }),
    ],
    pages: {
      signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
      strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
      async signIn(user, account, profile) {
        try {
          console.log({ user });
          const apiUrl = "http://localhost:3001/api/thirdparty";
          const requestData = {
            id: user?.user?.id,
            name: user?.user?.name,
            picture: user?.user?.image,
            email: user?.user?.email,
            source: user?.account?.provider,
          };

          const response = await axios.post(apiUrl, requestData);
          let token = response?.data?.token;

          // Use the useEffect hook to set the cookie on the client side
     
          console.log({decryptedUsername},{token})
          // useEffect(() => {
            setCookie({ res }, 'token', token, {
              maxAge: 3600, // Cookie expiration time in seconds (e.g., 1 hour)
              path: '/',    // Cookie path
            });

          console.log("Third-party API response:", response.data);
        } catch (error) {
          console.error("API Error:", error);
        }

        return true;
      },
      async jwt({ token, user, account }) {
        // console.log("jwt");
        // console.log({ token });

        if (token || user) {
          token.userRole = "admin";
          return { ...token };
        }
      },
      
    },
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
