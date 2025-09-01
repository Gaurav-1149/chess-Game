import { useEffect, useState } from "react";
import { ChessBoard } from "../components/ChessBoard"
import { socket } from "../hook/socket";
import {  type Color, type PieceSymbol, type Square } from "chess.js";
import { useNavigate } from "react-router-dom";


export const INIT_GAME = 'init_game'
export const MOVE = 'move'
export const GAME_OVER = 'game_over'


export const GamePage = () => {

  const webSocket = socket();

  const navigate = useNavigate()

    const [playerColor, setPlayerColor] = useState<"w"| "b"|null>(null)
    const [history, setHistory] = useState<any[][]>([])
    const [gameStarted, setGameStarted] = useState(false)
    const [findingMatch, setFindingMatch] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState()

    const [board, setBoard] = useState<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>([])
  
  useEffect(() => {
    if(!webSocket) {
      return;
    }

    webSocket.onmessage = (event) =>{
        const message = JSON.parse(event.data);

        switch(message.type){
          case INIT_GAME:
            console.log("game initialized");
            setPlayerColor(message.payload.color)
            setBoard(message.boardState)
            setGameStarted(true)

          break;
          case MOVE:
            // const move = message.payload;
            console.log("move is made");
            console.log(message.payload.from);
            setHistory(prevHistory => [...prevHistory, [message.payload.from, message.payload.to]])
            setBoard(message.boardState)
            console.log(message);
            
          break;
          case GAME_OVER:
            console.log("Game is over");
            setGameOver(true)
            setWinner(message.payload.winner)

          break;
        }
    }


  }, [webSocket] )

  useEffect(()=> {
    // console.log(history);
    
  }, [history])

  if(!webSocket) return <div>Connecting.....</div>

      console.log(history);      

  return (
    <div className=" text-white relative">
          {/* WATERMARK */}
          {gameStarted ? "": 
          <div className='h-full absolute flex justify-center w-full items-center opacity-20 rotate-12'>
              <img className='h-3/5' src="chessBoard.jpg" alt="" />
          </div>}
          <div className="h-screen flex flex-col justify-between items-center relative">
            {/* NAVBAR */}
            {gameStarted ? "": 

            <div className='w-full flex justify-between items-center px-8 pt-2'>
                <div>
                    <p className='text-2xl'>QuantumChess</p>
                </div>
                <div>
                    <button className=' px-4 py-2' onClick={() => navigate('/signin')}>Profile</button>
                </div>

            </div>}
            {/* MAIN SEGMENT */}
            <div>

            
      <div className="relative">

      {gameStarted===false ?

    <div className="h-full flex justify-center items-center w-screen" >

          {findingMatch===false?  
          <div className="flex flex-col justify-center items-center px-4 py-12 gap-5 bg-[#1a1a1a]/80 text-white">
            <p className="text-5xl">Choose Your Opponent</p>
            <div className="flex flex-col items-center">
            <p className="text-[#595959]">Select how you want to play. Challenge players from arount the</p>
            <p className="text-[#595959]">world or test your skills against our advanced AI.</p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button className="flex flex-col justify-center items-center bg-neutral-700/30 rounded-xl backdrop-blur-sm h-56 "
              onClick={()=>{
                  webSocket.send(JSON.stringify({
                    type:INIT_GAME
                  })),
                  setFindingMatch(true)
                }}>
              
                <img className="h-20 py-2" src="users.png" alt="" />
                <p className="py-2 text-xl">Play Online</p>
                <p className="text-[#595959] text-sm px-5">Complete against other players in</p>
                <p className="text-[#595959] text-sm px-5">real-time matchmaking.</p>
              </button>
              <button className="flex flex-col justify-center items-center bg-neutral-700/30 rounded-xl backdrop-blur-sm h-56 ">
                <img className="h-20 py-2" src="bot.png" alt="" />
                <p className="py-2 text-xl">Play with Bot</p>
                <p className="text-[#595959] text-sm px-5">Practice and improve by playing</p>
                <p className="text-[#595959] text-sm px-5">against an AI opponent.</p>
              </button>
              
            </div>
            <div className="flex justify-center items-center">
                      
            </div>
          </div>  :
          <div className="flex justify-center items-center h-screen">
            <p className="text-5xl font-bold p-3 text-white">waiting for an opponent ... </p>
          </div>}   
    </div>
              : 
                <div className="grid grid-cols-2 p-4 h-screen gap-5 ">
                  <div className="flex justify-center items-center ">
                    <ChessBoard socket= {webSocket} board = {board} playerColor= {playerColor} /> 
                  </div>
                  <div className=" flex justify-center items-start pt-14 max-h-screen   ">

                    <button
                      className="h-20 w-64 bg-blue-600 mt-10 rounded-lg p-4 font-bold text-white " onClick={() =>
                        webSocket.send(JSON.stringify({
                      type:GAME_OVER

                      }))
                      } >
                        test</button>

                  <table className=" mt-10  w-32 text-white border-2  rounded-lg border-separate border-indigo-900">
                    
                    <thead className="block w-full">

                      <tr className="  rounded-lg ">
                        <th className=" pl-2 ">From</th>
                        <th className=" pl-7">To</th>
                      </tr>
                    </thead>


                    <tbody className="max-h-72 overflow-y-scroll block" >
                        { history.map((row, i) => (
                          <tr key={i} className={i%2===0? '' : 'text-gray-500'}>
                              { row.map((cell, j)=> (
                                <td key={j} className="px-5 py-1  ">{cell}</td>                
                              ))}
                            </tr>
        
                          )) }   
                    </tbody>
                  </table>
                  </div>
                </div>
      }
      </div>

      {gameOver?  

      <div className=" absolute top-0 left-0 flex justify-center items-center h-screen w-screen  z-10">
          <div className="h-2/3 w-2/4 bg-white rounded-xl flex justify-center items-center flex-col">
          <p className="text-3xl font-bold p-3">{playerColor === winner? "YOU WON!!": "YOU LOST!"}</p>
          <p className="text-2xl  p-3"> {winner=== "w"? "White": "Black"} Won The match </p>
          <div className="flex text-2xl p-3 gap-1">

          <p className="">Rating: </p>
          {playerColor=== winner ? 
            <p className="text-green-500"> +{Math.floor(Math.random()*30)+120} </p>:
            <p className="text-red-500"> -{Math.floor(Math.random()*20)+60}</p>
          }
          </div>
          <button
            className="h-20 w-64 bg-blue-600 mt-10 rounded-lg p-4 font-bold text-white" 
            onClick={() => navigate("/") }

          >Back to home page</button>
          </div>
      </div>
      :""}
            </div>
            <div className='text-sm font-thin text-[#595959]'>
              2025 QuantumChess. No rights reserved
            </div>
          </div>
    </div>
  )
}



// prevHistory is not working in line 60
