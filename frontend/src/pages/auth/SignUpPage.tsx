import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { signup } from "../../hook/auth";
import { useUser } from "../../components/Context";
import { UserRoundPlus } from "lucide-react";

export default function SignUpPage() {

    const navigate = useNavigate()
    const {setAuthUser} = useUser()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
  
    const signupHandler = (e:any) => {
        e.preventDefault()
        console.log("signup btn pressed");
        signup( firstName, lastName, email, password, passwordRepeat, navigate)
        setAuthUser(true)
    }


  return (
     <div className="flex h-screen justify-center items-center relative"> 
        {/* WATERMARK */}
      <div className='h-full absolute flex justify-center items-center opacity-20 rotate-12'>
            <img className='h-3/5' src="chessBoard.jpg" alt="" />
      </div>
      <div className="h-screen flex flex-col  items-center w-screen z-10 relative">
              {/* NAVBAR */}
        <div className='w-full flex justify-between items-center px-8 text-white pt-3'>
                <div>
                    <p className='text-2xl'>QuantumChess</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[#595959]">Already have an account?</p>
                    <button className='bg-[#2563EB] rounded-lg px-4 py-2' onClick={() => navigate('/login')}>Log In</button>
                </div>

        </div>
        <div className="h-full  flex justify-center items-center">

       
      <div className="py-10 bg-[#1a1a1a] flex flex-col gap-2 px-10  items-center rounded-xl text-white">
        <div className="flex flex-col items-center">
          <p className="text-4xl pb-3">Create Account</p>
          <p className="text-sm font-thin text-[#595959] pb-5">Join the ultimate chess community. </p>
        </div>
        <form action="" className="flex flex-col gap-5 justify-center items-center" onSubmit={signupHandler}>
          <div className="flex ">
            <input 
              id="firstName"
              type="text" 
              placeholder="First Name" 
              onChange={e => setFirstName(e.target.value)}
              className=" bg-[#262626] border-stone-300/40 placeholder-[#595959] h-10 px-3 border mr-2 rounded-md w-36"/>
            <input 
              id="lastName" 
              type="text" 
              placeholder="Last Name"
              onChange={e => setLastName(e.target.value)}
              className=" bg-[#262626] border-stone-300/40 placeholder-[#595959] h-10 px-3 border rounded-md w-36"/>
          </div>
          <div className="w-full  ">

            <input 
              id="email" 
              type="text" 
              placeholder="Email" 
              onChange={e => setEmail(e.target.value)}
              className=" bg-[#262626] border-stone-300/40 h-10 placeholder-[#595959] px-3 border rounded-md w-full"/>
          </div>
          <div className="w-full">

            <input 
              id="password" 
              type="text" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
              className=" bg-[#262626] border-stone-300/40 placeholder-[#595959] h-10 px-3 border rounded-md w-full"/>
          </div>
          <div className="w-full">

            <input 
              id="passwordRepeat" 
              type="text" 
              placeholder="Repeat Password" 
              onChange={e => setPasswordRepeat(e.target.value)}
              className=" bg-[#262626] border-stone-300/40 placeholder-[#595959] h-10 px-3 border rounded-md w-full"/>
          </div>
         <button className="h-12 w-44 bg-[#16A34A] mt-3 rounded-lg flex justify-center items-center gap-2" >
          <UserRoundPlus />
          Sign Up</button>
        </form>
        {/* <div className="flex gap-1">

        <p>already have an account?</p>
        <button onClick={() => 
          navigate("/signin")
        }>Login</button>
        </div> */}

      </div>

    </div>
    </div>
    </div>


  )
}