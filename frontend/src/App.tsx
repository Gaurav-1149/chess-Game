import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GamePage } from './pages/GamePage.tsx'
import { Landingpage } from './pages/LandingPage.tsx'

import LogInPage from './pages/auth/LogInPage.tsx'
import SignUpPage from './pages/auth/SignUpPage.tsx'
import { useEffect } from 'react'
import { tokenCheck } from './middleware/tokenCheck.ts'
import { useUser } from './components/Context.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import HomePage from './pages/HomePage.tsx'
import TestPage from './pages/test.tsx'



function App() {

  const {authUser, setAuthUser} = useUser()

  // const [authUser, setAuthUser] = useState<any>()
  

  useEffect(()=> {
    
    const verifyAuth = async() => {
      const result = await tokenCheck()
      // console.log(result);
      
      setAuthUser(result)
    }
    verifyAuth()
    // console.log(authUser);
    
  }, [tokenCheck])

  return (

    <div className='bg-[#1A1A1A] w-full h-screen font-overpassMono font-semibold'>
     <header>


      <Routes>
        <Route path='/' element={ <Landingpage/> }/>
        <Route path='/test' element={ <TestPage/> }/>
        <Route path='/home' element={ <HomePage/> }/>
        {/* <Route path='/home' element={ authUser? <Landingpage/> : <Navigate to='/'/>}/> */}
        <Route path='/login' element={ !authUser? <LogInPage/> : <Navigate to='/'/>}/>
        <Route path='/signup' element={ !authUser? <SignUpPage/> : <Navigate to='/'/>}/>
        <Route path='/game' element={ authUser? <GamePage/> : <Navigate to='/'/> }/>
        <Route path='/profile' element={ authUser? <ProfilePage/> : <Navigate to='/'/> }/>
      </Routes>

     </header>
    </div>
  )
}

export default App
