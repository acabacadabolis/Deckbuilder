import React from "react";
import { Form, useActionData, useLoaderData, useParams } from "react-router-dom";
import MagicCard from "./MagicCard";

export async function Search ({ request }) {
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

    return (
        <div>
            <Form method="get" className=" border-2 border-red-900" >
                    <label >Search :
                        <input name="search" autoComplete="off" defaultValue={searchTerm}></input>
                    </label>
            </Form>
            <div className=" flex flex-wrap">
                {cardSearch ? cardSearch.data.map(magicCard => <MagicCard site="search" key={magicCard.id}{...magicCard} />) : null}
            </div>
        </div>
    )
}