import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import Card from "./Card"

const Deck = () => {
    const [deck, setDeck] = useState(null)
    const [drawn, setDrawn] = useState([])
    

    //get new deck onload and everytime setDeck is called 
    useEffect(() => {
        async function getDeck() {
            try {
                let res = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle")
                setDeck(res.data)
            } catch (err) {
                alert(err)
            }
        }
        getDeck()
    }, [setDeck])

/* Single Draw functionality
    //draw card one by one on click and add it to cardpile
    async function draw() {
        try {
            let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
            
            //if res is undefined or if deck is out of cards throw error
            if (res != undefined && res.data.remaining !== 0) {
                setDrawn(drawn => [...drawn, res.data.cards[0]])
            } else{
                throw new Error("out of cards")
            }

        } catch(err) {
            alert(err)
        }

    }
*/


// Keep drawing functionality
    const [keepDrawing, setKeepDrawing] = useState(false)
    const timer = useRef(null)

    useEffect(() => {
        async function draw() {
            try {
                let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)

                if (res !== undefined && res.data.remaining !== 0) {
                    setDrawn(drawn => [...drawn, res.data.cards[0]])
                } else{
                    setKeepDrawing(false)
                    throw new Error("out of cards")
                }
            } catch(err) {
                alert(err)
            }
        }

        if(keepDrawing && !timer.current) {
            timer.current = setInterval(async() => {
                await draw()
            }, 1000)
        }

        return () => {
            clearInterval(timer.current)
            timer.current = null
        }
    }, [keepDrawing, setKeepDrawing, deck])

    //toggle keep drawing
    const toggleDraw = () => {
        setKeepDrawing(keepDrawing => !keepDrawing)
    }

    //cardpile dom object
    const cardpile = drawn.map(card => (
        <Card key={card.code}
              image={card.image}
              value={card.value}
              suit={card.suit}
              code={card.code}
        />
    ))


    return (
        <div className="Deck">
            {deck ? (
                <button onClick={toggleDraw}>
                    Draw Card
                </button>
            ) : null}
            <div className="cardpile">
                {cardpile}
            </div>
        </div>
    )
}

export default Deck