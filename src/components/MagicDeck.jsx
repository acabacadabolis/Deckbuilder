import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import MagicDeckCard from "./MagicDeckCard";
import MagicDeckList from "./MagicDeckList";


export default function MagicDeck() {
    const dek = useLoaderData()
    
    const {user, mtgDeck, setMtgDeck} = useOutletContext()
    const [refresh, setRefresh] = useState(null) 

    

    return (
        <div className=" flex">
            <div> 
                {/* <select>
                    {user.mtgdecks.length !== 0? user.mtgdecks.map(deck => <option value={deck.id}>{deck.id}</option>):<option value="new deck">New Deck</option>}
                </select> */}
                <MagicDeckList setRefresh={setRefresh} deck={mtgDeck.cards} site="magic" setMtgDeck={setMtgDeck} />
            </div>
            <div className=" flex flex-wrap justify-center content-start">
                {mtgDeck.cards.map(magicCard => <MagicDeckCard setRefresh={setRefresh} setMtgDeck={setMtgDeck} deckid={mtgDeck.id} key={magicCard.id}{...magicCard} />)}
            </div>
        </div>
    )
}