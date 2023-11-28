import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Magic from './components/Magic'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() { 
  const [user, setUser]= useState(null)
  const [mtgDeck, setMtgDeck] = useState([])
  const [yugiDeck, setYugiDeck] = useState([])
  

  return (
    <>
      <div>
        <Header user={user} setUser={setUser} setMtgDeck={setMtgDeck} setYugiDeck={setYugiDeck} />
        <Outlet context={{user, setUser, mtgDeck, setMtgDeck, yugiDeck, setYugiDeck}} />
        {/* <Magic handleSubmit={handleSubmit} magicCards={magicCards}/> */}
      </div>
    </>
  )
}

export default App
