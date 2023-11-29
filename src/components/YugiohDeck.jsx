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
    const {yugiDeck, setMtgDeck, setUser, setYugiDeck} = useOutletContext()
    

    

    return (
        <div className=" flex">
            <MagicDeckList setRefresh={setRefresh} site="yugioh" deck={yugiDeck.yugi_cards} setYugiDeck={setYugiDeck} />
            <div className=" flex flex-wrap justify-center content-start">
                {yugiDeck.yugi_cards.map(ygoCard => <YugiohDeckCard setYugiDeck={setYugiDeck} deckid={yugiDeck.id} setRefresh={setRefresh} key={ygoCard.id}{...ygoCard} />)}
            </div>
        </div>
    )
}