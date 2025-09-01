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
    <div className="">
      <div className="relative">

      {gameStarted===false ?

    <div >

          {findingMatch===false?  <div className="grid grid-cols-2 p-4 h-lvh text-white">
            <div className="flex justify-center items-center flex-col">
              <p className="flex justify-center items-center text-5xl font-bold p-3 ">Win a match </p>
              <p className="flex justify-center items-center text-5xl font-bold p-3 ">And increase your rating</p>
            </div>
            <div className="flex justify-center items-center">
              <button 
                className="h-20 w-64 bg-blue-600 mt-10 rounded-lg p-4 font-bold " 
                onClick={()=>{
                  webSocket.send(JSON.stringify({
                    type:INIT_GAME
                  })),
                  setFindingMatch(true)
                }}
                
                >
                <p className="text-xl">Find a Match</p>
              </button>           
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
  )
}



// prevHistory is not working in line 60
