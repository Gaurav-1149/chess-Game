import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../hook/auth"
import { useUser } from "../../components/Context"
import { LogIn } from "lucide-react"


export default function LogInPage() {

  const {setAuthUser} = useUser()
  
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async(e:any) => {
      e.preventDefault()
      const res = await login(email, password)
      console.log("logged in", res);

      setAuthUser(true)

      navigate("/");

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
                    <p className="text-[#595959]">Don't have an account?</p>
                    <button className='bg-[#16A34A] rounded-lg px-4 py-2' onClick={() => navigate('/signup')}>Sign Up</button>
                </div>

        </div>
        <div className="h-full flex justify-center items-center">

        <div className="py-10 bg-[#1a1a1a] flex flex-col px-12 gap-8 items-center rounded-xl text-white z-10 relative">
        
      <div className="flex flex-col items-center">
        <p className="text-4xl pb-3">Welcome Back</p>
        <p className="text-sm font-thin text-[#595959] pb-5">Log in to contiue your journey. </p>
      </div>
        <form action="" className="flex flex-col justify-center items-center gap-5" onSubmit={loginHandler}>
          <div>

            <input 
              id="email" 
              type="text" 
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              className=" bg-[#262626] border-stone-300/40 placeholder-[#595959] h-10 px-3 border rounded-md w-72"/>
          </div>
          <div>

            <input 
              id="password"
              type="text" 
              placeholder="Password" 
              onChange={e => setPassword(e.target.value)}
              className=" bg-[#262626] border-stone-300/40 placeholder-[#595959] h-10 px-3 border rounded-md w-72"/>
          </div>
          <button className="h-12 w-44 bg-blue-600 mt-3 rounded-lg flex justify-center items-center gap-2">
            <LogIn />
            Log in
            </button>
        </form>
        {/* <div className="flex gap-1">

        <p>Don't have an account?</p>
        <button onClick={() => 
          navigate("/signup")
        }>Signup</button>
        </div> */}

        </div>
      </div>

      </div>
        
    </div>


)
}