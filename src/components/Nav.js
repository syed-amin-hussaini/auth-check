import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import logo from "@/src/images/logo.png";
import Avatar from "@/src/images/avatar.png";
import nookies, { destroyCookie } from "nookies";
import Link from "next/link";

const Nav = ({ user }) => {
  // console.log({ user });
  const { data: session } = useSession();

  // console.log(session?.expires)

  const handleSignout = (e) => {
    e.preventDefault();
    destroyCookie(null, "user", { path: "/" });
    signOut();
  };

  if (!session) return;
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <Link className="navbar-brand" href="/">
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
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          
        </button> */}
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
                  src={
                    session?.user?.image ||
                    Avatar
                  }
                  className="img-fluid rounded-circle"
                  alt="logo"
                  width={35}
                  height={35}
                />

                <h5 className="me-3 ms-1 mt-1 text-danger text-capitalize">
                  {session?.user?.name || "guest"}
                </h5>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleSignout} href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
