

export default function YugiohDeckCard({ setYugiDeck,id,setRefresh,  yugi_card}){


    function handleYgoDelete(e){
        
        fetch(`http://127.0.0.1:5555/ygocards/${e.target.id}`,{
            method:'DELETE'
        })
        .then((response) => {
            if(response.ok) {
                    setYugiDeck(prevDeck => {
                        prevDeck.yugi_cards = prevDeck.yugi_cards.filter(card => {return card.id != e.target.id})
                        return prevDeck
                    })
                    setRefresh(e.target.id)
            }
        })
    }

    return (
        <div className=" group/card max-w-xs content-center" >

            <img className=" " src={yugi_card.image} alt={yugi_card.name} />
            <button id={id} onClick={handleYgoDelete} className=" invisible group-hover/card:visible bg-lime-500 font-semibold hover:bg-red-600">Remove from Deck</button> 
        </div>
    )
}
