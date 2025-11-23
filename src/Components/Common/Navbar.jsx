import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../../data/navbar-links";
import { Link, matchPath } from "react-router";
import { BsChevronDown } from "react-icons/bs";

const matchRoute = (route) => {
  return matchPath({ path: route }, location.pathname);
};

const Navbar = () => {
  return (
    <div
      className={`flex h-14 items-center text-white justify-center border-b-[1px] border-b-[#2C333F] ${
        location.pathname !== "/" ? "bg-[#161D29]" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* logo */}
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            width={120}
            height={32}
            loading="lazy"
            className="rounded-xl p-2 border-2 border-white"
          />
        </Link>
        <nav className="">
          <ul className="flex gap-x-6 text-[#DBDDEA]">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-200"
                        : "text-[AFB2BF]"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-200 "
                          : "text-[#F1F2FF]"
                      }`}
                    >
                      {console.log(link.title)}
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
