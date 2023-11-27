import React from "react";
import { useLoaderData } from "react-router-dom";
import MagicCard from "./MagicCard";
import MagicDeckList from "./MagicDeckList";

export async function MagLoadDeck(){
    let CurrentDeck
    await fetch(`http://localhost:3000/magic`)
    .then(resp => resp.json())
    .then(data => CurrentDeck = data)
    return {CurrentDeck}
}

export default function MagicDeck(){
    const dek = useLoaderData()
    return (
        <div className=" flex">
            <MagicDeckList site="magic" deck={dek.CurrentDeck}/>
            <div className=" flex flex-wrap justify-center content-start">
                {dek ? dek.CurrentDeck.map(magicCard => <MagicCard site="deck" key={magicCard.id}{...magicCard} />) : null}
            </div>
        </div>
    )
}