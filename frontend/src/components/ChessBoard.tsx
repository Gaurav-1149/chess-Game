import { type Color, type PieceSymbol, type Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/GamePage";



export const ChessBoard = ({board, socket, playerColor }: {

  
  playerColor: String | null,
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  socket: WebSocket
}) => {


 

  // const turn = Chess.turn();
  
  const [from, setFrom] = useState<null | Square>(null)
  // const [currentColor, setCurrentColor] = useState("w")

  return (
    <div className={playerColor=== "b"? "-scale-y-100 scale-x-[-1]": ""}>
     { 
    
     board.map((row, i) => {
       return <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = String.fromCharCode((j%8)+97) + "" + (8-i) as Square
              
              function moveMaking() {
                
                // console.log(squareRepresentation);
                // console.log(currentColor);
                
                
                // console.log("backend color :") ;
                
                
                if(!from) {
                  if(playerColor===square?.color){
                      // console.log(square?.color);
                      setFrom(square?.square?? null)
                    }  
                  }else{
                      socket.send(JSON.stringify({
                        type: MOVE,
                        payload: {
                          from: from,
                          to: squareRepresentation
                        },
                        playerColor: playerColor
                        
                      }))  
                    setFrom(null)
                  }
                }
              
              
              return <div key={j}
              className={`h-16 w-16 ${ (i+j)%2 ===0 ? 'bg-[#8c8c8c]' : 'bg-[#4a4a4a]' }`}
              // {playerColor === Chess.turn() ?  : }
              


              onClick={() => {
                moveMaking()
              }}>

              <div className=" h-full flex justify-center items-center" >

              <img 
              src={`/${square?.color ==='w' ? `${square.type.toUpperCase()}.png` : `${square?.type}1.png` }`} 
              // className="w-10 h-auto "
              className={`w-10 h-auto ${playerColor=== "b"? "-scale-y-100 scale-x-[-1] ": ""}`}
              alt="" />
              </div>
{/*               
              {square ? square.type:""}
              {square ? square.color:""} */}
              {/* {squareRepresentation} */}
              
              </div>
            })}
        </div>
      })}
    </div>
  )
}
