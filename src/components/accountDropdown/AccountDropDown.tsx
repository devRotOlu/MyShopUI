import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { MdPersonOutline, MdLogout } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";

import { userContext } from "../context/UserProvider.tsx";
import "./style.css";

const AccountDropDown = () => {
  const appStates = useContext(userContext);
  const {
    loginData: { lastName },
    handLogout,
  } = appStates;

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!items) return;

    const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = items[currentIndex + 1] || items[0];
      next.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = items[currentIndex - 1] || items[items.length - 1];
      prev.focus();
    } else if (e.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className="position-relative" id="account_dropdown" ref={menuRef}>
      <button ref={buttonRef} className="d-flex align-items-center loginTriggerBtn justify-content-center" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((prev) => !prev)}>
        <span className="text-start text-wrap">My Account</span>
        <FaChevronDown size="2rem" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="bg-white" id="profile_wrapper" role="menu" aria-label="Account options" onKeyDown={handleKeyDown} tabIndex={-1}>
          <p>
            Hi <span>{lastName}</span>
          </p>
          <ol className="p-0 d-flex flex-column m-0">
            <li>
              <Link to="/account/profile" role="menuitem" tabIndex={0}>
                <MdPersonOutline size="1rem" />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/account/orders" role="menuitem" tabIndex={0}>
                <HiOutlineDocumentText size="1rem" />
                <span>My Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/account/favourites" role="menuitem" tabIndex={0}>
                <AiOutlineHeart size="1rem" />
                <span>My Saved Items</span>
              </Link>
            </li>
          </ol>
          <button onClick={handLogout} className="d-flex gap-2 align-items-center w-100" role="menuitem">
            <MdLogout size="1rem" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropDown;
