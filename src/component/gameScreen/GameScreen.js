import { useEffect, useRef, useState } from "react";
import "./gameScreen.css";
import keyboardData from "./KeyboardData";
import wordList from "./wordList";
import {TransitionGroup,CSSTransition} from "react-transition-group";
import { Button } from 'react-bootstrap';
import  ModalDialog from './GameOver';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';




function GameScreen(props)
{   
    const keyRef = useRef();
    const [input,setInput] = useState("");
    const [keyData,setKeyData] = useState(keyboardData);
    const [wordStack,setWordStack] = useState(wordList);
    const [myWord,setMyWord] = useState([]);
    const [myWord1,setMyWord1] = useState([]);
    const [level,setLevel] = useState(1);
    const [score,setScore] = useState(0);
    const [scor,setScor] = useState(0);
    const [second,setSecond] = useState(45);
    const [myTimer,setMyTimer] = useState(0);
    const [currentWord,setCurrentWord] = useState(wordList[0]);
    const [gameOver,setGameOver]  = useState(false);

     
    
    useEffect(()=>{keyRef.current.focus() },[])
  
    useEffect(()=>{
        const datas = wordStack.filter((word)=>input.toUpperCase()===word.toUpperCase() && input.toUpperCase()===currentWord.toUpperCase());

        if(datas.length!==0){
            setMyWord([...myWord,input])
            setScore((score)=>score+10) 
            setInput("")
        const randomNumber = Math.floor(Math.random()*wordList.length)
        randomNumber>=0 && randomNumber<=wordList.length ?
          setCurrentWord(wordList[randomNumber])
          : setCurrentWord(wordList[wordList.length-1])
        }
        
        if(myWord.length===5){
            setLevel((level)=>level+1)
            setMyTimer(0)
            setMyWord([])
            setInput("")
            setSecond((second)=>second-1)
           }
        },[input,myWord,level])

    useEffect(()=>{
          
          if(Math.floor(myTimer) ===second){
            setGameOver((gameOver)=>!gameOver);
            return;
          }  
          else{
            time()
          }  
        },[myTimer])

          const time = ()=>{
          setTimeout(() => {
         
          setMyTimer((myTimer)=> myTimer+1)
        // if(myTimer === second){
        //   setLevel(1)
        //   setScor(score)
        //   setScore(0)
        //   setMyTimer(0)
        //   setMyWord([])
        //   setSecond(45)
        // }  
      },1000);
        
    }
    const inputBar=(event)=>
    {
        const current = event.target.value;
        setInput(event.target.value);
        const newInput = [...keyData];
        const key = current.toUpperCase();
        newInput.map((x)=>x.active=false);
        const myData = newInput.findIndex((x)=>x.name===key.charAt(key.length-1));
        if(myData!==-1)
        newInput[myData].active=!newInput[myData].active;
        setKeyData(newInput);
        
    }
    return(
        <div className="wrapper">
          <div className="top-text"><h1>WORD RACE</h1></div>
                         {/********Progress-section start*********/}
            <div className="progress">
            <div className="level">
                <div className="level-no">
                {level}
                </div>
                <div className="level-text">LEVEL</div>
            </div>
            
            <div className="score">
                    <div className="score-no">
                        {score}
                    </div>
                    <div className="score-text">SCORE</div>
            </div>

            <div className="time">
                    <div className="time-no">

                     <h3>{Math.floor(myTimer)} / {second}</h3>
                    </div>
                    <div className="time-text">TIME</div>
            </div>
          </div>
                          {/********Progress-section End*********/}
          <div className="stack-box">

            {[...currentWord]&&[...currentWord].map((letter,index)=>{
              let color;
              if(letter===input.charAt(input.length-1))
              {
                color = "red"
              }
              else{
                color = null;
              }
              let back = index===input.length-1? color:""
              return (
                <span style={{background:back}} key={index}>
                  {letter}
                </span>
              )
            })}
          </div>
                          {/*********InputBox-section start*********/}
            <div className="topSide">
              
               <div className="inputbox"><input type ="text" placeholder="Type Here..." ref={keyRef}
                value={input} onChange={inputBar}/>
               </div>

            </div>
                           {/*********InputBox-section End *********/}

                          {/* *************Stack-box Section Start************* */}
            <div className="wordStack">
             
        {/* <TransitionGroup component={null}>
        {wordStack.length !== 0 &&
          wordStack.map((word, index) => {
            return (
              <CSSTransition key={word} timeout={500} classNames="word">
                <div className="word">
                  {word?.split("").map((letter, index) => {
                    let color;
                    if (
                      input.split("")[index] === letter &&
                      word.startsWith(input)
                    ) {
                      if (input === word[0]) {
                        // t1.current = Date.now();
                      }

                      color = "#8abe5e";
                    } else {
                      color = null;
                    }
                    return (
                      <span key={index} style={{ backgroundColor: color }}>
                        {letter}
                      </span>
                    );
                  })}{" "}
                </div>
              </CSSTransition>
            );
          })}
      </TransitionGroup>   */}
            </div>
                        {/* *************Stack-box Section End************* */}


                            {/* ******keyboard-section Start****** */}
            <div className="bottomSide">
                {keyData && keyData.map((characterList)=>
                (
                    <div className={`key ${characterList.active ?'active':''}`}>
                        <div className="keyValue">{characterList.name}</div>
                    </div>
                ))}
            </div>
            
                   {/* ******keyboard-section End****** */}

                   {gameOver && <ModalDialog setOn={props.gameOn} mytimer={myTimer} gameOver={gameOver} score={score}/>}
            

        </div>
    );

    
}

export default GameScreen;