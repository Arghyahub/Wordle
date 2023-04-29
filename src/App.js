import { useState } from 'react';
import './App.css';

function App() {

  const [WarnText, setWarnText] = useState("Enter 5 letters") ;
  const [LinkTxt, setLinkTxt] = useState("") ;

  let handleKey = (event) => {
    const str = (event.target.value) ;
    if (str.length < 5)
      setWarnText("Enter 5 letters") ;
    else if (str.length === 5)
      setWarnText("Perfect") ;
    else
      setWarnText("The Word is too big") ;
  }

  let generateLink = () => {
    const inputElem = document.getElementsByTagName('input')[0] ;
    let val = inputElem.value ;

    let str = "" ;
    
    for (let i=0; i<val.length; i++){
      let charAscii = val.charCodeAt(i) - 97 ;
      if (charAscii <= 9 ) {
        str+=`0${charAscii}` ;
        console.log(`${val[i]} - 0${charAscii}`) ;
      }
      else{
        str+=`${charAscii}` ;
        console.log(`${val[i]} - ${charAscii}`) ;
      }
    }

    setLinkTxt(`${window.location.href}/${str}`) ;
  }


  // Authentication and Copy Button Left
  return (
    <div className="App flex-col">
      <h1>Welcome to Wordle multiplayer</h1>
      <h4>Enter a Word</h4>
      <input type="text" onChange={handleKey} />
      <p>{WarnText}</p>
      <button onClick={generateLink}>Generate Link</button>
      <p className="link">{LinkTxt}</p>
    </div>
  );
}

export default App;