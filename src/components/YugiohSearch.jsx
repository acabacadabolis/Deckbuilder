import React, { useEffect } from "react";
import { Form, useActionData, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import YugiohCard from "./YugiohCard";

export async function YgoSearch ({ request }) {
    let url = new URL(request.url);
    let searchTerm = url.searchParams.get("search");
    let cardSearch
    searchTerm ?
        await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`)
        .then(resp => resp.json())
        .then(data => cardSearch = data)
        : cardSearch = null
    return  {cardSearch, searchTerm} ;
    }

export default function YugiohSearch(){
    const {cardSearch, searchTerm} = useLoaderData();

    const { yugiDeck, setUser,setMtgDeck, setYugiDeck} = useOutletContext()
    
    

    return (
        <div>
            <Form method="get" className="" >
                    <label htmlFor="search" >Search :</label>
                    <input name="search" className=" border-2 border-gray-900" autoComplete="off" defaultValue={searchTerm}></input>
                    
            </Form>
            <div className=" flex flex-wrap">
                {cardSearch ? cardSearch.data.map(ygoCard => <YugiohCard site="search" deckid={yugiDeck.id} setYugiDeck={setYugiDeck} key={ygoCard.id}{...ygoCard} />) : null}
            </div>
        </div>
    )
}