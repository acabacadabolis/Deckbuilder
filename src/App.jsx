import { useEffect, useState } from 'react'
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
        <div>
            <Header user={user} setUser={setUser} setMtgDeck={setMtgDeck} setYugiDeck={setYugiDeck} />
            <Outlet context={{user, setUser, mtgDeck, setMtgDeck, yugiDeck, setYugiDeck}} />
            {/* <Magic handleSubmit={handleSubmit} magicCards={magicCards}/> */}
        </div>
    </>
    )
}

export default App
