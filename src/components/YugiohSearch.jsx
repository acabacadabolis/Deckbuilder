import React from "react";
import { Form, useActionData, useLoaderData, useParams } from "react-router-dom";
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

    return (
        <div>
            <h1>This yugioh search</h1>
            {/* <Form method="get" className=" border-2 border-red-900" >
                    <label htmlFor="search" >Search :</label>
                    <input name="search" autoComplete="off" defaultValue={searchTerm}></input>
                    
            </Form>
            <div className=" flex flex-wrap">
                {cardSearch ? cardSearch.data.map(ygoCard => <YugiohCard site="search" key={ygoCard.id}{...ygoCard} />) : null}
            </div> */}
        </div>
    )
}