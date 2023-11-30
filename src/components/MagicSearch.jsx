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

    const {user, setUser, setYugiDeck, mtgDeck, setMtgDeck} = useOutletContext()

    
    
    return (
        <div>
            <Form method="get" className="" >
                <label className=" bg-white bg-opacity-50 font-semibold" htmlFor="search" >Search :</label>
                <input name="search" className=" border-2 border-gray-900" autoComplete="off" defaultValue={searchTerm}></input>
            </Form>
            <div className=" flex flex-wrap">
                {cardSearch ? cardSearch.data.map(magicCard => <MagicCard mtgDeck={mtgDeck} setMtgDeck={setMtgDeck} key={magicCard.id}{...magicCard} />) : null}
            </div>
        </div>
    )
}