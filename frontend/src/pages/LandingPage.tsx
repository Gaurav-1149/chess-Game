// import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import chessBoard from "../assets/chessBoard.png"
import knightLogo from "../assets/KnightLogo.png"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { tokenCheck } from "../middleware/tokenCheck";
import { signout } from "../hook/auth";

// const {user} = useUser()



export const Landingpage = () => {

  const signoutHandler = async(e:any) => {
    e.preventDefault()
    await signout()
    setAuthUser(null)


  }
  
const [authUser, setAuthUser] = useState<any>()
  

  useEffect(()=> {
    
    const verifyAuth = async() => {
      const result = await tokenCheck()
      setAuthUser(result)
    }
    verifyAuth()
    // console.log(authUser);
    
  }, [tokenCheck])



  const navigate = useNavigate();


  // console.log("SIGN IN URL:", import.meta.env.VITE_PUBLIC_CLERK_SIGN_IN_URL);

  return (
    <div className="h-screen ">


      <div className=" w-screen h-10 flex items-center justify-between px-10 pt-7">
        <div className="flex justify-center items-center">

        <img src="/LOGO.png" alt="" className="h-16 w-auto" />
        <p className="text-3xl text-white font-bold ">RookMate</p>
        </div>

        <div>
          {authUser=== true? 
            <div className="text-white flex gap-5">
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button  onClick={signoutHandler}>
                  sign out
              </button>
            </div>
          :""}

          
        </div>

          


        {/* <UserButton /> */}

        
      </div>
      <div className="h-screen grid grid-cols-2">
        <div className="flex justify-center items-center">
          <img src={chessBoard} alt="" className="w-2/3"/>
        </div>

        <div className="flex justify-center items-center flex-col text-white p-6">
          <p className="text-5xl font-bold p-3">Play Chess Online</p>
          <p className="text-5xl font-bold">on the #1 Site!</p>
          <p className="mt-5 font-bold">Match with someone at your level</p>


        { authUser? <button className="h-20 w-64 bg-blue-600 mt-10 rounded-lg p-4" onClick={()=> navigate('/game')}>
            <div className="items-center flex justify-center gap-6">
            <img src={knightLogo} alt="" className="w-11 h-auto"/>
            <div>
              <p className="text-xl font-bold">Play Online</p>
            </div>
            </div>
          </button> :
          <button className="h-20 w-64 bg-blue-600 mt-10 rounded-lg p-4 text-xl" onClick={() => navigate('/login')}>
              sign in
            </button> }
          

            


            
          

        </div>
      </div>
    </div>
    
  )
  // console.log(user);
}
