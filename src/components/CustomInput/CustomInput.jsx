import "./CustomInput.css"

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  value,
  isDisabled
}) => {


  return (
    <input className="customInputDesign"
      type={typeProp}
      name={nameProp}
      placeholder={placeholderProp}
      value={value || "" }
      disabled={isDisabled}
      onChange={(e) => handlerProp(e)}
    />
  );
};