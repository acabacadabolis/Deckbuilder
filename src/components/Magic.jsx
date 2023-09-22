import React from "react";
import MagicCard from "./MagicCard";

export default function Magic ({ handleSubmit, magicCards }) {

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <input name="search" ></input>
            </form>
            <div>
                {magicCards.map(magicCard => <MagicCard {...magicCard} />)}
            </div>
        </div>
    )
}