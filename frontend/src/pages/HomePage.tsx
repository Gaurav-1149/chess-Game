import { Plus, UserRoundPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



const HomePage = () => {

    const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col justify-between items-center text-white py-3 relative '>
        {/* WATERMARK */}
        <div className='h-full absolute flex justify-center items-center opacity-20 rotate-12'>
            <img className='h-3/5' src="chessBoard.jpg" alt="" />
        </div>
        <div className='h-screen flex flex-col justify-between items-center w-screen z-10 relative'>
            
            {/* NAVBAR */}
            <div className='w-full flex justify-between items-center px-8 '>
                <div>
                    <p className='text-2xl'>QuantumChess</p>
                </div>
                <div>
                    <button className='bg-[#404040] rounded-lg px-4 py-2' onClick={() => navigate('/login')}>Login</button>
                </div>

            </div>
            {/* MAIN SEGMENT */}
            <div className='flex flex-col items-center gap-4 bg-[#1a1a1a]/30 py-10 w-full'>
                <div>
                    <p className=' text-5xl'>The Ultimate Chess Experience</p>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <p >Play, learn and master the art of chess. Join a community of</p>
                    <p>players and evelate your game to the next level.</p>
                </div>
                <div className='flex gap-10'>
                    <button className=' bg-[#2563EB] flex items-center justify-center py-4 gap-2 text-lg rounded-lg px-8'>
                        <Plus />
                        <p>Play with Bot</p>
                    </button>
                    <button 
                    className=' bg-[#16A34A] flex items-center justify-center py-4 gap-2 text-lg rounded-lg px-8' 
                    onClick={() => navigate("/signup")}>
                        <UserRoundPlus />
                        <p>Create Account</p>
                    </button>
                </div>
            </div>
            <div className='text-sm font-thin text-[#595959]'>2025 QuantumChess. No rights reserved</div>
        </div>
    </div>
  )
}

export default HomePage