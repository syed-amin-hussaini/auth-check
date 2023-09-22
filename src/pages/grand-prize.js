import Camera from '@/components/Camera'
import { cookieDataServer, revertToken } from '@/components/GenerateToken';
import axios from 'axios';
import React from 'react'

const GrandPrize = (result) => {
  return (
    <Camera cookieStatus={result} />
  )
}

export async function getServerSideProps({req, res}) {
  let user = cookieDataServer(req);
  let userId = parseInt(user?.id);
  let userAuth = revertToken(user?.auth); 
  // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}cookie-status?user_id=${userId}`; 
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}cookie-status?user_id=4`; 
 
  const response = await axios.get(
    apiUrl,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth}`,
      },
    }
  );
  let result = response?.data ?? "";

  console.log("Cookie Check");
  console.log({ result });
  return {
    props: result,
  };
}

export default GrandPrize