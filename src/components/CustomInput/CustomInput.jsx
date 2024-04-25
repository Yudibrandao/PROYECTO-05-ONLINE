import "./CustomInput.css"

export const CustomInput = ({
    typeProp,
    nameProp,
    placeholderProp, 
    handlerProp, 

}) => {    

    return (
        <input className="customInputDesign"
        type={typeProp} 
        name={nameProp}
        placeholder={placeholderProp}
        onChange={(e) => handlerProp(e)}
        >
        </input>
    )
}