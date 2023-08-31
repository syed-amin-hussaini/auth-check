import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import axios from "axios";
import { setCookie } from "nookies";


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
   
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // callbacks: {
  //   async jwt({ token }) {
  //     token.userRole = "admin"
  //     return token
  //   },
  // },
  callbacks: {
    async signIn({user, account, profile}:any) {
      try {
        // console.log({ user });
        const apiUrl =  `https://obackend.hul-hub.com/api/verify-user`;
        const requestData = {
          id: user?.user?.id,
          name: user?.user?.name,
          image: user?.user?.image,
          email: user?.user?.email,
          source: user?.account?.provider,
        };

        const response = await axios.post(apiUrl, requestData);
        // console.log(response?.data)
        let token = response?.data?.token;
        let profile_status = response?.data?.profile_status;
        console.log("API REsult") 
        console.log({ token })
        console.log({profile_status})

        // Use the useEffect hook to set the cookie on the client side
        // useEffect(() => {
          // setCookie({ res }, 'user', `{\"token\":\"${token}\",\"profile_status\":\"${profile_status}\"}` , {
          // setCookie({ res }, 'user', `{\"token\":\"${token}\",\"profile_status\":\"incomplete\"}` , {
          //   maxAge: 3600, // Cookie expiration time in seconds (e.g., 1 hour)
          //   path: '/',    // Cookie path
          // });

        console.log("Third-party API response:", response?.data);
      } catch (error) {
        console.error("API Error:", error);
      }

      return true;
    },
    async jwt({ token, user, account }:any) {
      // console.log("jwt");
      // console.log({ token });

      if (token || user) {
        token.userRole = "admin";
        return { ...token };
      }
    },
    // async redirect({url, baseUrl}) {
    //   console.log('url', url);
    //   console.log('baseUrl', baseUrl);
      
    //   return url.startsWith(baseUrl) ? "/" : baseUrl + '/';
    // }
  },
}

export default NextAuth(authOptions)
