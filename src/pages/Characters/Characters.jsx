import { useState } from "react"
import { bringAllCharacters } from "../../services/apiCalls"
import "./Characters.css"



export const Characters = () => {
    const [characters, setCharacters] = useState([])

    const bringCharacters = () => {

        // const apiResponse = await bringAllCharacters()

        bringAllCharacters()
        .then((apiResponse) => {
            setCharacters(apiResponse.data.results)
            console.log(apiResponse.data.results)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const characterCardClickHndler = (char) => {
        console.log(char, "Hola")
    }

    return(

        <div className="characters-desing">
            Aqui tendremos personajes 
            <button onClick={bringCharacters}>Personajes</button> 
            <ol>
                {characters.map((char) => {
                    return(
                        <CharacterCard key={char.id}
                        character= {char}
                        handleclick={characterCardClickHndler(char)}
                        />
                    )
                })}   
            </ol>
        </div>
    )
}