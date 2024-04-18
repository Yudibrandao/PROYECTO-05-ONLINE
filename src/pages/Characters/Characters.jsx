import { bringAllCharacters } from "../../services/apiCalls"
import "./Characters.css"



export const Characters = () => {

    const bringCharacters = () => {

        // const apiResponse = await bringAllCharacters()

        bringAllCharacters()
        .then((apiResponse) => {
            console.log(apiResponse)
        })

        .catch()


    }

    return(

        <div className="characters-desing">
            Aqui tendremos personajes 
            <button onclick={bringCharacters}>Personajes</button> 
        </div>
    )
}