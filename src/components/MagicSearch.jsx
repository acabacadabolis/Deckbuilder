import React, { useEffect } from "react";
import { Form, useActionData, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import MagicCard from "./MagicCard";

export async function MagSearch ({ request }) {
    let url = new URL(request.url);
    let searchTerm = url.searchParams.get("search");
    let cardSearch
    searchTerm ?
        await fetch(`https://api.scryfall.com/cards/search?q=${searchTerm}`)
        .then(resp => resp.json())
        .then(data => cardSearch = data)
        : cardSearch = null
    return  {cardSearch, searchTerm} ;
    }

export default function MagicSearch(){
    const {cardSearch, searchTerm} = useLoaderData();

    const {user, mtgDeck, setMtgDeck} = useOutletContext()

    useEffect(()=>{
        fetch('http://127.0.0.1:5555/mtgdecks',
        {credentials:"include"})
        .then((response) => {
            if(response.ok) {
                response.json().then((data) => setDecks(data))
            }
        })
    },[])
    
    return (
        <div>
            <Form method="get" className=" border-2 border-red-900" >
                <label htmlFor="search" >Search :</label>
                <input name="search" autoComplete="off" defaultValue={searchTerm}></input>
            </Form>
            <div className=" flex flex-wrap">
                {cardSearch ? cardSearch.data.map(magicCard => <MagicCard deckid={mtgDeck.id} setMtgDeck={setMtgDeck} key={magicCard.id}{...magicCard} />) : null}
            </div>
        </div>
    )
}