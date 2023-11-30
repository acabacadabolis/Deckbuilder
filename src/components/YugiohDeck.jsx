import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import MagicCard from "./MagicCard";
import MagicDeckList from "./MagicDeckList";
import YugiohCard from "./YugiohCard";
import YugiohDeckCard from "./YugiohDeckCard";

export async function YgoLoadDeck(){
    let CurrentDeck
    await fetch(`http://localhost:3000/yugioh`)
    .then(resp => resp.json())
    .then(data => CurrentDeck = data)
    return {CurrentDeck}
}

export default function YugiohDeck(){
    const dek = useLoaderData()
    const [refresh, setRefresh] = useState(null)
    const {yugiDeck, user, setMagicRefresh, setMtgDeck, setUser, setYugiDeck} = useOutletContext()
    

    function handleChange(e){
        fetch(`http://127.0.0.1:5555/ygodecks/${e.target.value}`)
        .then((response) => {
            if(response.ok) {
                response.json().then((data)=>{
                    setYugiDeck(data)
                    setMagicRefresh(e.target.id)
                })
            }
        })
    }

    function handleNewDeck(){
        fetch(`http://127.0.0.1:5555/ygodecks`, {
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
                    setYugiDeck(data)
                    setUser(prev =>{
                        prev.yugidecks.push(data)
                        return prev
                    })
                    setMagicRefresh(data.id)
                })
            }
        })
    }

    function handleDelDeck(){
        fetch(`http://127.0.0.1:5555/ygodecks/${yugiDeck.id}`,{
            method:'DELETE'
        })
        .then((response) => {
            if(response.ok) {
                    setYugiDeck(user.yugidecks[0])
            }
        })
    }

    return (
        <div className=" flex">
            <div>
                <select defaultValue={yugiDeck.id} onChange={handleChange}>
                    {yugiDeck.length > 0 ?user.yugidecks.length !== 0? user.yugidecks.map(deck => <option value={deck.id}>{deck.id}</option>):<option value="new deck">New Deck</option>:null}
                </select>
                <button className=" bg-slate-200 border-2 hover:bg-slate-400 border-gray-800" onClick={handleNewDeck}>New Deck</button>
                <button className=" bg-red-500 border-2 hover:bg-red-700 border-gray-800" onClick={handleDelDeck}>Del Deck</button>
                {yugiDeck.length > 0 ?<MagicDeckList setRefresh={setRefresh} site="yugioh" deck={yugiDeck.yugi_cards} setYugiDeck={setYugiDeck} />:null}
            </div>
            <div className=" flex flex-wrap justify-center content-start">
                {yugiDeck.length > 0 ?yugiDeck.yugi_cards.map(ygoCard => <YugiohDeckCard setYugiDeck={setYugiDeck} deckid={yugiDeck.id} setRefresh={setRefresh} key={ygoCard.id}{...ygoCard} />):null}
            </div>
        </div>
    )
}