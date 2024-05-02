import "./CustomInput.css"

export const CustomInput = ({
  type,
  name,
  placeholderProp,
  handler,
  value,
  isDisabled
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    handler(value, name);
  };

  return (
    <input className="customInputDesign"
      type={type}
      name={name}
      placeholder={placeholderProp}
      value={value || "" }
      disabled={isDisabled}
      onChange={(e) => handleChange(e)}
    />
  );
};