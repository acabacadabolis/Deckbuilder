import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Magic from './components/Magic'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() { 

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
