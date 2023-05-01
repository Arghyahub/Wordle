import React , {useState , useRef } from 'react'
import { useParams } from 'react-router-dom'

import './Game.css'

let wordMat = [
  ["1","1","1","1","1"],
  ["1","1","1","1","1"],
  ["1","1","1","1","1"],
  ["1","1","1","1","1"],
  ["1","1","1","1","1"],
  ["1","1","1","1","1"]
] ;

let colorMat = [
  ["white","white","white","white","white"],
  ["white","white","white","white","white"],
  ["white","white","white","white","white"],
  ["white","white","white","white","white"],
  ["white","white","white","white","white"],
  ["white","white","white","white","white"]
] ;

let rowCount = 0;

const Game = () => {
  const [Matrix, setMatrix] = useState([...wordMat]) ;
  const [BgColor, setBgColor] = useState([...colorMat]) ;
  const [Terminate, setTerminate] = useState(0) ;
  const inputRef = useRef(null);

  let { game } = useParams() ;
  let word = "" ;
  for (let i=0; i<game.length; i+=2){
    let num = Number(game.substring(i,i+2)) + 97 ;
    word+= String.fromCharCode(num) ;
  }

  let insertRow = () => {
    wordMat = Matrix ;
    colorMat = BgColor ;
    let inputWord = inputRef.current.value ;
    
    for (let j=0; j<5; j++){
      wordMat[rowCount][j] = inputWord[j] ;
      if (inputWord[j] === word[j]){
        colorMat[rowCount][j] = 'green' ;
      }
      else if (word.indexOf(inputWord[j]) !== -1 ){
        colorMat[rowCount][j] = 'yellow' ;
      }
    }

    setMatrix([...wordMat]) ;
    setBgColor([...colorMat]) ;
    rowCount = rowCount + 1;


    // row out of bound problem , Show winner Status left , color change and wordlength check

  }

  return (
    <div id="Game">
      <div className="head flex-row">
        <h1>Wordle .</h1>
        <a href="https://www.wikihow.com/Play-Wordle"> learn</a>
      </div>

      <div className="game-box flex-col">
        <div className="word-wrap flex-col">
          { Matrix.map((arr,indx) => (
              <div key={indx} className="word-arr flex-row">
                { arr.map((chars,indy) => (
                    <div style={{ backgroundColor : BgColor[indx][indy] }} key={indy} className='word-chars'>{chars}</div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>

      <div className="input-box flex-row">
        <input ref={inputRef} type="text" maxLength={5} />
        <button onClick={insertRow} >⬆️</button>
      </div>

    </div>
  )
}

export default Game