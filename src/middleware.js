import { NextResponse } from "next/server";
import { parseCookies } from 'nookies';

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
    const userIpData = await userIpResponse.json();
    const userCountry = userIpData.country_name;
    // console.log(userCountry)
    // const token = req.cookies.get("token");
    let user = req.cookies.get("user")?.value;
     user = JSON?.parse(user)
    // console.log({req})
    console.log(user)
    console.log(user?.token)
   
    if (userCountry === 'Pakistans' && req.url !== '/testing') {
      console.log("Redirecting user from Pakistan to /testing route");
      return NextResponse.rewrite(new URL('/testing', req.url))
    }
    if ( user?.profile_status != "complete"  ||  user?.profile_status == undefined || user?.profile_status == null ) {
      console.log("Redirect to Register");
      return NextResponse.rewrite(new URL('/registration', req.url));
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
