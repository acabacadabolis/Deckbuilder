import React from "react";
import { useLoaderData } from "react-router-dom";
import MagicCard from "./MagicCard";
import MagicDeckList from "./MagicDeckList";
import YugiohCard from "./YugiohCard";

export async function YgoLoadDeck(){
    let CurrentDeck
    await fetch(`http://localhost:3000/yugioh`)
    .then(resp => resp.json())
    .then(data => CurrentDeck = data)
    return {CurrentDeck}
}

export default function YugiohDeck(){
    const dek = useLoaderData()
    return (
        <div className=" flex">
            <MagicDeckList site="yugioh" deck={dek.CurrentDeck}/>
            <div className=" flex flex-wrap justify-center">
                {dek ? 
                dek.CurrentDeck.map(ygoCard => <YugiohCard site="deck" key={ygoCard.id}{...ygoCard} />) 
                // dek.CurrentDeck.map(ygoCard => console.log(ygoCard))
                    : null}
            </div>
        </div>
    )
}