import { useState } from 'react';
import './App.css';

function App() {

  const [WarnText, setWarnText] = useState("Enter 5 letters") ;
  const [LinkTxt, setLinkTxt] = useState("") ;
  const [Auth, setAuth] = useState(false) ;

  let handleKey = (event) => {
    const str = (event.target.value) ;
    if (str.length < 5){
      setWarnText("Enter 5 letters") ;
      setAuth(false) ;
    }
    else if (str.length === 5){
      setWarnText("Perfect") ;
      setAuth(true) ;
    }
    else{
      setWarnText("The Word is too big") ;
      setAuth(false) ;
    }
  }

  let generateLink = () => {
    if (Auth === false){
      setWarnText("The Word should have 5 letters") ;
      setLinkTxt("") ;
      return;
    }

    const inputElem = document.getElementsByTagName('input')[0] ;
    let val = inputElem.value ;

    let str = "" ;
    
    for (let i=0; i<val.length; i++){
      let charAscii = val.charCodeAt(i) - 97 ;
      if (charAscii <= 9 ) {
        str+=`0${charAscii}` ;
      }
      else{
        str+=`${charAscii}` ;
      }
    }

    setLinkTxt(`${window.location.href}${str}`) ;
  }

  let copyClip = () => {
    navigator.clipboard.writeText(LinkTxt) ;
  }

  return (
    <div className="App flex-col">
      <h1>Welcome to Wordle multiplayer</h1>
      <h4>Enter a Word</h4>
      <input type="text" onChange={handleKey} />
      <p className='warn-text' style={{color : Auth? 'green':'red'}} >{WarnText}</p>
      <button className='gen-btn' onClick={generateLink}>Generate Link</button>
      <div style={{ visibility : (LinkTxt.length!==0)? 'visible':'hidden' }} className="link flex-row">
        <p>{LinkTxt}</p>
        <button className='cpy-btn' style={{ visibility : (LinkTxt.length!==0)? 'visible':'hidden' }} onClick={copyClip} >🔗copy</button>
      </div>
    </div>
  );
}

export default App;