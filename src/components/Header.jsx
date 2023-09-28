import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header () {
    return(
        <div className="flex space-x-4 justify-center">
            <Link to={"/Magic"}>Magic</Link>
            <Link to={"/Pokemon"}>Pokemon</Link>
            <Link to={"/YuGiOh"}>Yugioh</Link>
        </div>
    )
}