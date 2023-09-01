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
    const userIpData = await userIpResponse?.json();
    const userCountry = userIpData?.country_name ?? "empty";
    // console.log(userCountry)
    // const token = req.cookies.get("token");
    let user = req?.cookies?.get("user") ;
    let getUser = user?.value;
    console.log({getUser})
    let userCurrent;
    if (getUser) {
      userCurrent = JSON?.parse(user)
    }
    // console.log({req})
    console.log({userCurrent})
    console.log({userCountry})
   
  } catch (error) {
    console.error("Error fetching user IP data:", error);
  }

  // Allow the request to continue processing
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
};
