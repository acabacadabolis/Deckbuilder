import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Magic from './components/Magic'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() { 
    const [user, setUser]= useState(null)
    const [mtgDeck, setMtgDeck] = useState(null)
    const [yugiDeck, setYugiDeck] = useState(null)
    const [site, setSite] = useState(null)
    let food

    site === 'yugi' ? food = "bg-[url('/public/_3b21f5ac-ca9b-40fe-ba8e-648577115c32.jpg')]" : 
        site === 'magic'? food = "bg-[url('/public/_de6248e2-0f8b-433b-8cb5-da0e95cb49ac.jpg')]":
        null
    useEffect(()=>{
        fetch('http://127.0.0.1:5555/check_session',{
            credentials: "include"
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(data => {
                    setUser(data)
                    setMtgDeck(data.mtgdecks[0])
                    setYugiDeck(data.yugidecks[0])
                })
            }
        })

    },[])

    return (
    <>
        <div >
            <Header user={user} setUser={setUser} setSite={setSite} setMtgDeck={setMtgDeck} setYugiDeck={setYugiDeck} />
            <Outlet context={{user, setUser, setSite, mtgDeck, setMtgDeck, yugiDeck, setYugiDeck}} />
            {/* <Magic handleSubmit={handleSubmit} magicCards={magicCards}/> */}
        </div>
        {site?null:<div className="bg-[url('/public/default.jpg')] h-screen"></div>}
    </>
    )
}

export default App
