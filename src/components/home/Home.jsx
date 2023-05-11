import React , {useState} from 'react'

import './Home.css'

const Home = () => {
    const [WarnText, setWarnText] = useState("Enter 5 letters") ;
  const [LinkTxt, setLinkTxt] = useState("") ;
  const [Auth, setAuth] = useState(false) ;

  const checkWord = async (str) => {
    try {
      const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${str}`;
      const response = await fetch(api);
      console.clear() ;

      if (response.status === 404) {
        return false;
      }
      
      return true;
    } catch (err) {
      return false;
    }
  };

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

  const generateLink = async () => {
    try {
      if (Auth === false){
        setWarnText("The Word should have 5 letters") ;
        setLinkTxt("") ;
        return;
      }

      const inputElem = document.getElementsByTagName('input')[0] ;
      const val = inputElem.value.toLowerCase() ;

      const wordResponse = await checkWord(val) ;
      if (wordResponse === false){
        setWarnText("Not a valid English Word") ;
        return;
      }

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
    catch(err){
      // console.log("idk why" + err) ;
    }
  }

  let copyClip = () => {
    // navigator.clipboard.writeText(LinkTxt) ;

    const tempTextArea = document.createElement('textarea') ;
    const root = document.getElementById('root') ;
    tempTextArea.value = LinkTxt ;

    root.appendChild(tempTextArea) ;

    tempTextArea.select() ;
    document.execCommand('copy') ;

    root.removeChild(tempTextArea) ;
  }
  return (
    <div id="Home" className='height-100 flex-col'>
      <div className="home-title">
        <h1>Welcome to Wordle Multiplayer</h1>
      </div>

      <div className='flex-col home-box height-100'>
        <div className="gen-box flex-col">
          <h4>Enter a Word</h4>
          <input className='home-ip' type="text" onChange={handleKey} />
          <p className={ Auth? 'warn-text auth' : 'warn-text notauth'}  >{WarnText}</p>
          <button className='gen-btn' onClick={generateLink}>Generate Link</button>
          <div style={{ visibility : (Auth && LinkTxt.length!==0)? 'visible':'hidden' }} className="link flex-row">
            <p>{LinkTxt}</p>
            <button className='cpy-btn' style={{ visibility : (Auth && LinkTxt.length!==0)? 'visible':'hidden' }} onClick={copyClip} >🔗copy</button>
          </div>
          <p style={{ visibility : (Auth && LinkTxt.length!==0)? 'visible':'hidden' }} className='share'>Share With friends🥳</p>
        </div>
      </div>

    </div>
  )
}

export default Home