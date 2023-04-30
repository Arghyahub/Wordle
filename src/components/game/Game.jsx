import React from 'react'
import { useParams } from 'react-router-dom'

import './Game.css'

const Game = () => {

  let { game } = useParams() ;

  let wordMat = [
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"]
  ] ;

  return (
    <div id="Game">
      <div className="head flex-row">
        <h1>Wordle .</h1>
        <a href="https://www.wikihow.com/Play-Wordle"> learn</a>
      </div>

      <div className="game-box flex-col">
        <div className="word-wrap flex-col">
          {
            wordMat.map((array1d) => (
              <div className="word-arr flex-row">
                {
                  array1d.map((chars) => (
                    <div className='word-chars'>{chars}</div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Game