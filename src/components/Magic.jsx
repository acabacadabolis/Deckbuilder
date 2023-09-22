import React from "react";
import MagicCard from "./MagicCard";

export default function Magic ({ handleSubmit, magicCards }) {

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <input name="search" autoComplete="off"></input>
            </form>
            <div id="search-display">
                {magicCards.map(magicCard => <MagicCard key={magicCard.id}{...magicCard} />)}
            </div>
        </div>
    )
}