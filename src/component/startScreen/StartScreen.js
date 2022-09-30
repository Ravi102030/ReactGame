import  "./startScreen.css";
import {Link} from 'react-router-dom'
import { useState } from "react";


function StartScreen(props)
{
    
    return(
        <div className="container">
            <h1 className="title">WORD RACE</h1>
            <img className="hero-image" src="/images/pngjoy.com_adobe-photoshop-icon-typing-keyboard-clip-art-transparent_9197071.png" alt=""/>
            <ul className="info">
                <li>Player has to type the words present in the stack box.</li>
                <li>Once the time is over, the game is over.</li>
                <li>The score is calculated on the basis of how many ward typed.</li>
                <li>For every 5 correct word the level will be increase by 1.</li>
                <li>For every 1 word contain 10 score.</li>
                <li>After every level the time will be decreases by 1 second.</li>
                

            </ul>

            <button className="start-btn" onClick={()=>props.setOn()}>Start Game</button>
        </div>
    );


}
export default StartScreen;