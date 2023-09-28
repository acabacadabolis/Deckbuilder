import React from "react";
import MagicCard from "./MagicCard";

export default function Magic ({ handleSubmit, magicCards }) {

    return (
        <div >
            <h1 className="text-3xl font-bold underline">
                Magic: The Gathering
            </h1>
            <form  onSubmit={handleSubmit} className=" border-2 border-red-900" >
                <label >Search :
                    <input name="search" autoComplete="off" ></input>
                </label>
            </form>
            <div id="search-display">
                {magicCards.map(magicCard => <MagicCard key={magicCard.id}{...magicCard} />)}
            </div>
        </div>
    )
}