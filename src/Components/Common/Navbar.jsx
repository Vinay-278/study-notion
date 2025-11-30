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
import { useLocation } from 'react-router';

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
    <div>
      
    </div>
  )
}

export default Navbar
