import './App.css';

import { BrowserRouter , Route , Routes } from 'react-router-dom';

import './components/home/Home'
import Home from './components/home/Home';
import Game from './components/game/Game'

function App() {
  return (
    <BrowserRouter> 
      <Routes>

        <Route path='/' element = {<Home/>} />
        <Route path='/:game' element = {<Game/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;