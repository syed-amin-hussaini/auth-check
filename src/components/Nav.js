import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import logo from "@/src/images/logo.png";
import Avatar from "@/src/images/avatar.png";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "./Alert";
import LoginPop from "./LoginPop";
import Modal from "./Modal";


const Nav = () => {
  const [userLogin, setUserLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCookie = () => {
      const cookies = parseCookies();
      if (cookies?.user) {
        setUserLogin(false)
        // let emailStatus = JSON?.parse(cookies?.user)?.email_status;
        // let username = JSON?.parse(cookies?.user)?.name;
        // console.log({username})
        // setEmail(emailStatus)
        // setName(username)

      } else { 
        setUserLogin(true)
        console.log("cookies?.user out" )
        if (router.pathname !== "/privacypolicy" && router.pathname !== "/termsofuse" && router.pathname !== "/faq" && router.pathname !== "/torchControl") {
          router.push("/");
        }
        // if (router.basePath) 
      }
    }
    fetchCookie();
  }, [])
  const { data: session } = useSession();
  console.log({session})
  
  const handleSignout = (e) => {
    e.preventDefault();
    destroyCookie(null, "user", { path: "/" });
    signOut();
  };
  // if (!session) return;
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="d-flex justify-content-between w-100">
            <Link className="navbar-brand" href="/index">
              <Image src={logo} alt="logo" width={30} height={30} />
            </Link>
            <button
              className="navbar-toggler mr-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              <span className="navbar-toggler-icon text-black"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll w-100 justify-content-end">
              <li className="dropdown nav-item">
                <a
                  className="align-items-center d-flex dropdown-toggle justify-content-end nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image
                    // src={session?.user?.image || Avatar}
                    src={Avatar}
                    className="img-fluid rounded-circle"
                    alt="logo"
                    width={35}
                    height={35}
                  />

                  {/* <h5 className="me-3 ms-1 mt-1 text-danger text-capitalize">
                    {name|| "guest"}
                  </h5> * /}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={handleSignout}
                      href="#"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      
      {/* {
        email == "false" && router.pathname == "/dashboard"  && <Alert customClass={"text-center p-1"} action="warning" msg={[{ msg: "Please verify your email" }]} />
      } */}
        {/* <div className="alert alert-warning d-flex align-items-center alert-active" role="alert">
          <Alert action="alert-warning" msg={["Please verify our email"]} />
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
             className="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          <div className="ms-2"> Verify email</div>
        </div> */}
       {userLogin && <LoginPop userStatus={userLogin} />}
       {/* {<Modal userStatus={!userLogin} />} */}
    </>
  );
};

export default Nav;
