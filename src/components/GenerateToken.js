import nookies,{ parseCookies } from "nookies";

const generateToken = (token) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 3) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return token + result;
};
const revertToken = (token) => {
  return token.slice(0, -3);
};

const cookieDataClient = () => {
  const cookies = parseCookies();
  if (cookies?.user) {
    let userInfo = JSON?.parse(cookies?.user);
    // let user = JSON?.parse(userIdCookie);
    return userInfo
  }
};
const cookieDataServer = (req) => {
  const cookies = nookies.get({req});
  const userIdCookie = cookies["user"];
  console.log(userIdCookie)
    let user;
    if (userIdCookie) {
      user = JSON?.parse(userIdCookie)
  }
  return user
};

export { generateToken, revertToken, cookieDataClient,cookieDataServer};
