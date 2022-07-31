import './App.css';
import GameScreen from './component/gameScreen/GameScreen';
import React from 'react';
import StartScreen from './component/startScreen/StartScreen';
import { useState } from "react";

function App(){
  const [on,setOn] = useState(false); 
  const gameOn = () =>{
    setOn((on)=>!on)
  }
  return (
  <div className='main-container'>
  {on?<GameScreen setOn={gameOn}></GameScreen>: <StartScreen setOn={gameOn}></StartScreen>} 

  </div>

  
   );
  }

export default App;
