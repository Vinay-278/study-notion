import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../../data/navbar-links'
import {apiConnector} from '../../Service/apiconnector'
import {categories} from '../../Service/apis'
import {ACCOUNT_TYPE} from '../../Util/constants'
import ProfileDropDown from '../Core/Auth/ProfileDropDown'
import ProgressBar from './progressbar'
import { Link, useLocation } from 'react-router';

const Navbar = () => {

  const {token} = useSelector((state)=>state.auth)
  const {user} =useSelector((state)=>state.profile)
  const {totalItems} =useSelector((state)=>state.cart)
  //->useSelector is used to take data from redux store
  //->state.auth, state.profile, state.cart means you are accessing the auth, profile, cart slice of your store
  //->inside auth, profile, cart 
  //->you are picking only token by destucturing

  const location= useLocation()
  //->This is from React Router 
  //-> useLocation() returns the current URL path  of the user

  const [subLinks, setSubLinks] =useState([])
  const [loading, setLoading] =useState(false)
  const [mobileMenuOpen, setMoblieMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] =useState(false)
  //->you are creating a state variable
  //->(intially) subLinks([]->empty), loading(false), mobileMenuOpen(false), dropdownOpen(false)

  //useEffect runs after the components renders
  //[] means ->run only once (when the component loads.)
  //React first renders your UI
  // Then its run side effects such as api call, dom updates
  //using useEffect with [] prevents infinite API calls
  useEffect(()=>{
    const fetchCategories = async () =>{
      setLoading(true);
      try{
        const res =await apiConnector('GET', categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      }
      catch(error){
        console.log("Could not fetch Categories.",error)
      }
      setLoading(false)
    }
    fetchCategories();
  },[])

  const matchRoute =(route) =>{
      return location.pathname ===route;
  }

  const toggleMobileMenu = () =>{
    setMoblieMenuOpen(!mobileMenuOpen);
  }

  const closeMobileMenu = () =>{
    setMoblieMenuOpen(false);
  }

  const toggleDropdown = () =>{
    setDropdownOpen(!setDropdownOpen);
  }

  const handleMouseEnter = () =>{
    setDropdownOpen(true);
  }

  const handleMouseLeave = () =>{
    setDropdownOpen(false);
  } 

  return (
    <div className="navbarContainer sticky top-0 left-0 z-1000">
      <div className="flex items-center justify-center bg-black border-b-[1px] border-b-[#000814]">
        <div className="flex flex-col w-full max-w-maxContent items-center justify-between px-4 py-2">
          <div className="flex items-center justify-between w-full px-1 py-1">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src={logo}
                alt="Logo"
                width={170}
                height={32}
                loading="lazy"
              />
            </Link>
            <button
              className="block text-2xl text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? "X" : <AiOutlineMenu />}
            </button>
          </div>
          <nav className={`${mobileMenuOpen ? "block" : "hidden"} mt-4 block`}>
            <ul className="flex w-full max-w-maxContent items-center justify-between px-4 py-2 gap-y-4">
              {NavbarLinks.map(({ title, path }, index) => (
                <li
                  key={index}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="mb-2 transition duration-300 ease-in-out transform hover:text-yellow-200 hover:scale-105 relative"
                >
                  {title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-100 hover:text-yellow-200"
                          : "text-[#AFB2BF] hover:text-[#999DAA]"
                      }`}
                      onClick={toggleDropdown}
                    >
                      <p>{title}</p>
                      <BsChevronDown />
                      {dropdownOpen && (
                        <div className="absolute left-[50%] top-[50%] z-1000 flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-white p-4 text-[#000814] opacity-100 transition-all duration-150 group-hover:translate-y-[1.65em]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-white">
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks && subLinks.length ? (
                              <>
                                {subLinks
                                  .filter(
                                    (subLinks) => subLinks?.course?.length > 0
                                  )
                                  .map((subLinks, i) => (
                                    <Link
                                      to={`/catalog/${subLinks.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      className="rounded-lg bg-transparent py-4 pl-4 hover:bg-[#585D69]"
                                      key={i}
                                      onClick={toggleDropdown}
                                    >
                                      <p>{subLinks.name}</p>
                                    </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center">No Course Found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to={path} onClick={closeMobileMenu}>
                      <p
                        className={`${
                          matchRoute(path)
                            ? "text-yellow-200"
                            : "text-[#999DAA]"
                        } hover:text-yellow-200`}
                      >
                        {title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className={`${mobileMenuOpen ? "block" : "hidden"} block mt-2`}>
            <div className="flex flex-col items-center justify-center gap-y-4 gap-x-8">
              {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to={"/dashboard/cart"}
                  className="relative"
                  onClick={closeMobileMenu}
                >
                  <AiOutlineShoppingCart className='text-2xl text-["#AFB2BF]' />
                  {
                    totalItems >0 && (
                      <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-[] text-center text-xs font-bold text-yellow-500'>
                        {totalItems}
                      </span>
                    )
                  }
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar
