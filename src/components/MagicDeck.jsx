import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import MagicDeckCard from "./MagicDeckCard";
import MagicDeckList from "./MagicDeckList";


export default function MagicDeck() {
    const dek = useLoaderData()
    
    const {user ,setUser ,setMagicRefresh , mtgDeck, setMtgDeck} = useOutletContext()
    const [refresh, setRefresh] = useState(null) 

    function handleChange(e){
        fetch(`http://127.0.0.1:5555/mtgdecks/${e.target.value}`)
        .then((response) => {
            if(response.ok) {
                response.json().then((data)=>{
                    setMtgDeck(data)
                    setMagicRefresh(e.target.id)
                })
            }
        })
    }

    function handleNewDeck(){
        fetch(`http://127.0.0.1:5555/mtgdecks`, {
            method:'POST',
            credentials: "include",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'name':"food"})
        })
        .then((response) => {
            if(response.ok) {
                response.json().then((data)=>{
                    setMtgDeck(data)
                    setUser(prev =>{
                        prev.mtgdecks.push(data)
                        return prev
                    })
                    setMagicRefresh(data.id)
                })
            }
        })
    }

    function handleDelDeck(){
        fetch(`http://127.0.0.1:5555/mtgdecks/${mtgDeck.id}`,{
            method:'DELETE'
        })
        .then((response) => {
            if(response.ok) {
                    setMtgDeck(user.mtgdecks[0])
            }
        })
    }

    return (
        <div className=" flex">
            <div>
                <div>
                    <select defaultValue={mtgDeck.id} onChange={handleChange}>
                        {user?user.mtgdecks.length !== 0? user.mtgdecks.map(deck => <option value={deck.id}>{deck.id}</option>):<option value="new deck">New Deck</option>:null}
                    </select>
                    <button className=" bg-slate-200 border-2 hover:bg-slate-400 border-gray-800" onClick={handleNewDeck}>New Deck</button>
                    <button className=" bg-red-500 border-2 hover:bg-red-700 border-gray-800" onClick={handleDelDeck}>Del Deck</button>
                </div>
                {mtgDeck ?<MagicDeckList setRefresh={setRefresh} deck={mtgDeck.cards} site="magic" setMtgDeck={setMtgDeck} />:null}
            </div>
            <div className=" flex flex-wrap justify-center content-start">
                {mtgDeck ? mtgDeck.cards.map(magicCard => <MagicDeckCard setRefresh={setRefresh} setMtgDeck={setMtgDeck} deckid={mtgDeck.id} key={magicCard.id}{...magicCard} />):null}
            </div>
        </div>
    )
}