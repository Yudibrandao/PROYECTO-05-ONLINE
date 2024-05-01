import { useEffect, useState } from "react"
import { bringAllCharacters } from "../../services/apiCalls"
import "./Characters.css"



export const Characters = () => {
    const [characters, setCharacters] = useState([])
    const bringCharacters = () => {


        // const apiResponse = await bringAllCharacters()

        bringAllCharacters()
            .then((res) => {
                setCharacters(res)

            })
            .catch((error) => {
                console.log(error, "Error");
            });
    };

    useEffect(bringAllCharacters, [])

    return (

        <div className="characters-desing  charactersDesing">
            Aqui tendremos personajes
            <button onClick={bringCharacters}>Personajes</button>
            <ol>
                {characters.map((char) => {
                    return (
                        <CharacterCard key={char.id}
                            character={char}
                            handleclick={characterCardClickHndler(char)}
                        />
                    )
                })}
            </ol>
        </div>
    )
}