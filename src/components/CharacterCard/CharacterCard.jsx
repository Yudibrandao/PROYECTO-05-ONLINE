import "./CharacterCard.css"

export const characterCard = ({ character }) => {
    const handleClick =() => {
        console.log("buenos dias")
    }

    return (
        <div class name= "character-card">
            <h4> {character.name}</h4>
            <h5> {character.species}</h5>
            <img src={character.image}></img>
        </div>
    )
}