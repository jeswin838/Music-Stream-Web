import React from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import PlayerContextProvider from './context/PlayerContext'
import {useContext} from 'react'
import { PlayerContext } from './context/PlayerContext'
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
 const App = () => {
const{audioRef ,track} = useContext(PlayerContext)
 const location = useLocation();
  const isLogin = location.pathname === "/login";


return (
  <div className='h-screen bg-black overflow-hidden '>
    <div className='h-[90%] bg-[#78787826] flex overflow-y-auto'>
      
      <Sidebar />
      <Display/>
      <div className='absolute bottom-4 '>
         <Player/>
<audio ref={audioRef} src={track.file} preload="auto"></audio>
          
            <Routes>
        <Route
          path="/"
          element={
            <>
             
             
            </>
          }
        />


            <Route path="/login" element={<Login />} />
      </Routes>
     </div>
    

   
    </div>

  </div>

)

}

export default App

   