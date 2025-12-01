import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router"
import { SiGmail } from "react-icons/si"
import { FaLock } from "react-icons/fa"
import { useState } from "react"


const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const [formData, setformData] =useState({
        email:"",
        password:""
    })
    const [showPassword, setShowPassword]=useState(false);
    const {email, password}= formData;
    const handleOnChange = (e)=>{
        setformData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value,
        }))
    }
    const handleOnSubmit =(e)=>{
        e.preventDefault();
        dispatch(Login(email,password,navigate))
    }

  return (
    <form onSubmit={handleOnChange} className="mt-6 flex">
      
    </form>
  )
}

export default LoginForm
