import React from "react";
import { Link } from "react-router-dom";

export default function Yugioh(){
    return (
        <div>
            <h1 className="text-3xl font-bold underline">YuGiOh</h1>
            <Link className=" text-lg font-semibold mx-6" to={"/Yugioh/search"}>Search</Link>
        </div>
    )
}