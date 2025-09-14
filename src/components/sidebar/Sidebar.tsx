import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import BrandWrapper from "../brandWrapper/BrandWrapper";
import CategoryList from "../categoryList/CategoryList";
import AccountNavigation from "../accountNavigation/AccountNavigation";
import Footer from "../footer/Footer";

import "./style.css";
import { userContext } from "../context/UserProvider";
import { appContext } from "../context/AppProvider";

const Sidebar = () => {
  const {
    loginData: { firstName, lastName, email },
    isLoggedIn,
    handLogout,
  } = useContext(userContext);
  const { setModalIndex } = useContext(appContext);
  const divRefs = useRef<(HTMLElement | null)[]>([]);
  const setRef = (el: HTMLElement | null, index: number) => {
    divRefs.current[index] = el;
  };
  useEffect(() => {
    const elements = [...divRefs.current];
    const handleClick = () => {
      setTimeout(() => {
        setModalIndex(0);
      }, 100);
    };
    elements.forEach((element) => {
      element?.addEventListener("click", handleClick);
    });
    return () => {
      elements.forEach((element) => {
        element?.removeEventListener("click", handleClick);
      });
    };
  }, [setModalIndex]);
  return (
    <div className="bg-white  w-100 d-flex flex-column" id="side_bar">
      <div className="p-3 position-fixed top-0 vw-100 opacity-100 bg-white" id="toggle_wrapper">
        <BrandWrapper />
      </div>
      {!isLoggedIn && (
        <div className="d-flex gap-3 px-3 pb-2 pt-4 w-100 mt-5 " id="auth_links_wrapper">
          <span className="w-50" ref={(el) => setRef(el, 0)}>
            <Link to="/account/login" className="w-100 text-center fw-bold py-2 d-block">
              Login
            </Link>
          </span>
          <span className="w-50" ref={(el) => setRef(el, 1)}>
            <Link to="/account/signup" className="w-100 py-2 text-center fw-bold d-block">
              Signup
            </Link>
          </span>
        </div>
      )}
      {isLoggedIn && (
        <div className="px-3 flex-grow-1 mt-5 pt-3">
          <div className="d-flex gap-3 w-100 py-2" id="user_info">
            <span className="fw-bold px-3 py-2 text-white align-self-start">{firstName[0]}</span>
            <div>
              <p className="fw-bold">
                {firstName}&nbsp;&nbsp;
                {lastName}
              </p>
              <p className="my-1">{email}</p>
              <span ref={(el) => setRef(el, 2)}>
                <Link to="/account/profile" className="fw-bold">
                  ACCOUNT SETTINGS
                </Link>
              </span>
            </div>
          </div>
          <AccountNavigation />
        </div>
      )}
      <div className="mt-4 bg-white w-100 px-3">
        <p className="fw-bold">Categories</p>
        <div ref={(el) => setRef(el, 3)}>
          <CategoryList />
        </div>
      </div>
      {isLoggedIn && (
        <div className="mt-3 px-3">
          <Icon icon="material-symbols-light:logout" fontSize="1.5rem" />{" "}
          <button className="ms-2" onClick={handLogout} ref={(el) => setRef(el, 4)}>
            Logout
          </button>
        </div>
      )}
      <div className="mt-3 p-3">
        <p className="py-3 border-bottom border-top fw-bold">Contact us</p>
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
