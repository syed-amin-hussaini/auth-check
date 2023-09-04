import { NextResponse } from "next/server";
import { parseCookies } from 'nookies';
import { getToken } from "next-auth/jwt";


export default async function middleware(req) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  try {
    const userIpResponse = await fetch("https://json.geoiplookup.io/", requestOptions);
    const userIpData = await userIpResponse?.json();
    const userCountry = userIpData?.country_name;
    // console.log(userCountry)
    // const token = req.cookies.get("token");
    let user = req?.cookies.get("user")?.value;
    if (user) {
      user = JSON?.parse(user) 
    }
    let userDetail = {
      userStatus:user?.profile_status,
      userToken:user?.token,
      userCountry:userCountry,
    }
    console.log("Cookie Result")
    console.log({userDetail})
    // const sessionMiddleware = await getToken({ req: req, secret: process.env.JWT_SECRET }); console.log('Session in middleware: ', sessionMiddleware)
    // console.log({sessionMiddleware})
    if (user === undefined) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
    if (userCountry === 'Pakistans' && req.url !== '/testing') {
      return NextResponse.rewrite(new URL('/testing', req.url))
    }
    if (user?.profile_status != "complete"  ||  user?.profile_status == undefined || user?.profile_status == null ) {
      return NextResponse.rewrite(new URL('/profile', req.url));
    }
    
  } catch (error) {
    console.error("Error fetching user IP data:", error);
  }

  // Allow the request to continue processing
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
};
