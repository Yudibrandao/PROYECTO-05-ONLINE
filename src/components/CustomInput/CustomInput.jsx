import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const CustomInput = ({
  placeholder,
  type,
  name,
  handler,
  value,
  disabled,
  max,
  min,
  className,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    if (handler && typeof handler === "function") {
      handler(value, name); // Llama a la función handler si es una función válida
    } else {
      console.error("Error: handler is not a valid function");
    }
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        max={max}
        min={min}
        onChange={handleChange} // No es necesario usar arrow function aquí
        className={className}
        disabled={disabled}
      />
    </InputGroup>
  );
};

// CustomInput.propTypes = {
//   placeholder: PropTypes.string,
//   type: PropTypes.string,
//   name: PropTypes.string,
//   handler: PropTypes.func, // No es necesario que sea requerido si lo estás manejando correctamente en handleChange
//   value: PropTypes.any,
//   disabled: PropTypes.bool,
//   max: PropTypes.number,
//   min: PropTypes.number,
//   className: PropTypes.string,
// };

export default CustomInput;
