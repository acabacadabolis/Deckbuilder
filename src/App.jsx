import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Magic from './components/Magic'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
  const [search, setSearch] = useState("")
  const [magicCards, setMagicCards] = useState([])

  function handleSubmit(event){
    event.preventDefault()
    console.log(event.target.search.value)
    setSearch(event.target.search.value)

    
      fetch(`https://api.scryfall.com/cards/search?q=${event.target.search.value}`)
      .then(resp => resp.json())
      .then(data => setMagicCards(data.data))          
    }

  

  return (
    <>
      <div>
        <Header />
        <Outlet />
        {/* <Magic handleSubmit={handleSubmit} magicCards={magicCards}/> */}
      </div>
    </>
  )
}

export default App
