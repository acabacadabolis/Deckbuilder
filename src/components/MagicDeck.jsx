import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MagicCard from "./MagicCard";
import MagicDeckList from "./MagicDeckList";

export async function MagLoadDeck() {
    let CurrentDeck
    await fetch(`http://localhost:3000/magic`)
    .then(resp => resp.json())
    .then(data => CurrentDeck = data)
    return {CurrentDeck}
}

export default function MagicDeck() {
    const dek = useLoaderData()
    const [deck, setDeck] = useState(null)
    
    useEffect(()=>{
        fetch('http://127.0.0.1:5555/mtgdecks')
        .then((response) => {
            if(response.ok) {
                response.json.then((data) => console.log(data))
            }
        })
    },[])
    
    return (
        <div className=" flex">
            <div>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <MagicDeckList site="magic" deck={dek.CurrentDeck}/>
            </div>
            <div className=" flex flex-wrap justify-center content-start">
                {dek ? dek.CurrentDeck.map(magicCard => <MagicCard site="deck" key={magicCard.id}{...magicCard} />) : null}
            </div>
        </div>
    )
}