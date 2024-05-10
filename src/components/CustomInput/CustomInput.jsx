import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const CustomInput = ({
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

  return (
    <>
      <label htmlFor={name}>  {placeholder} </label>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          max={max}
          min={min}
          onChange={handler}
          className={className}
          disabled={disabled}
        />
      </InputGroup>
    </>
  );
};

