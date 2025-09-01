

const TestPage = () => {
  return (
    <div className="h-screen ">
      <div className="grid grid-cols-7 max-h-screen gap-14">
        <div className=" col-span-2 flex flex-col h-screen gap-14 ">{/* padding is causing problem in screen height */}
          <div className="bg-gradient-to-r from-[#120433] from-20% via-[#554697] via-50% to-[#bbc0e8] to-90% rounded-r-3xl mt-14">
            <div className="flex flex-col justify-center items-center">
              <img src="/LOGO.png" alt="" className="h-40 w-auto" />
              <p className="text-5xl text-white font-bold ">RookMate</p>
            </div>
          </div>
          <div className="bg-slate-600 text-white  rounded-tr-3xl h-3/4 flex flex-col justify-center items-center p-10"> 
                <img src="/R.png" alt="" className="h-24 w-fit"/>
                <div className="flex flex-col items-start w-full">
                  <div className="flex justify-between w-3/4">
                  <p>Name</p>
                  <p>:</p>
                  <p> ABC XYZ</p>
                  </div>
                  <div className="flex justify-between w-3/4">
                  <p>Rating</p>
                  <p>:</p>
                  <p> 700</p>
                  </div>
                  <div className="flex justify-between w-3/4">
                  <p>Game Played</p>
                  <p>:</p>
                  <p> 23</p>
                  </div>
                  <div className="flex justify-between w-3/4">
                  <p>Name</p>
                  <p>:</p>
                  <p> ABC XYZ</p>
                  </div>
                 
                </div>
          </div>
        </div>
        <div className=" col-span-5 flex gap-14 flex-col max-h-screen ">
          <div className="bg-slate-600 h-14 rounded-bl-3xl"> NavBar</div>

          <div className="bg-slate-600 h-3/4 rounded-l-3xl grid grid-cols-3"> 
              <div className=" rounded-l-3xl flex items-center relative overflow-hidden "> 
                <img src="/chessBoard.png" alt="abc" className=" absolute rotate-45 -left-1/2 "/>
              </div>
              <div className="  w-full col-span-2">
                

                <div className="flex flex-col justify-center p-4 h-full text-white">
                  <div className="flex justify-center items-center flex-col">
                    <p className="flex justify-center items-center text-5xl font-bold p-3 ">Win a match </p>
                    <p className="flex justify-center items-center text-5xl font-bold p-3 ">And increase your rating</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button 
                      className="h-20 w-64 bg-blue-600 mt-10 rounded-lg p-4 font-bold " 
                      // onClick={()=>{
                      //   webSocket.send(JSON.stringify({
                      //     type:INIT_GAME
                      //   })),
                      //   setFindingMatch(true)
                      // }}
                      
                      >
                      <p className="text-xl">Find a Match</p>
                    </button>           
                  </div>
                </div>




                
                {/* <button>test1</button> */}
                {/* <button>test2</button> */}
              </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage

// #120433
// #554697
// #187192232