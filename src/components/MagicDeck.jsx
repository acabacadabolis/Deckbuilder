import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import MagicDeckCard from "./MagicDeckCard";
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
    
    const {user, mtgDeck, setMtgDeck} = useOutletContext()
    
    return (
        <div className=" flex">
            <div> 
                <select>
                    {user.mtgdecks.length !== 0? user.mtgdecks.map(deck => <option value={deck.id}>{deck.id}</option>):<option value="new deck">New Deck</option>}
                </select>
                <MagicDeckList deck={mtgDeck}/>
            </div>
            <div className=" flex flex-wrap justify-center content-start">
                {mtgDeck.map(magicCard => <MagicDeckCard setMtgDeck={setMtgDeck} deckid={mtgDeck.id} key={magicCard.id}{...magicCard} />)}
            </div>
        </div>
    )
}