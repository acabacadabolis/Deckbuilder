import React from "react";
import { useLoaderData } from "react-router-dom";
import MagicCard from "./MagicCard";

export async function LoadDeck(){
    let CurrentDeck
    await fetch(`http://localhost:3000/magic`)
    .then(resp => resp.json())
    .then(data => CurrentDeck = data)
    return {CurrentDeck}
}

export default function MagicDeck(){
    const dek = useLoaderData()
    return (
        <div className=" flex flex-wrap justify-center">
            {dek ? dek.CurrentDeck.map(magicCard => <MagicCard site="deck" key={magicCard.id}{...magicCard} />) : null}
        </div>
    )
}