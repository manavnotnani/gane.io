import React from "react";
import { Form } from "react-bootstrap";
import "./InputCustom.scss";

const Textarea = (props) => {
  /** RESTRICT USER TO ENTER e, E, +, -, . IN INPUT TYPE NUBER */
  const disabledCharacters = ["e", "E", "+", "-"];
  const onKeyDown = (e) => {
    if (props.disableDecimal) {
      disabledCharacters.push(".");
    }

    /** RESTRICT USER TO ENTER MORE THEN MAX LENGTH IN INPUT TYPE NUBER */
    return props.type === "number"
      ? (disabledCharacters.includes(e.key) ||
          (e.key !== "Backspace" &&
            props.maxlength &&
            e.target.value.length === props.maxlength)) &&
          e.preventDefault()
      : props.onlyChar;
  };
  return (
    <>
      <Form.Group
        className={`customInput textarea ${props.className}`}
        controlId={props.controlId}
      >
        {props.label ? (
          <Form.Label htmlFor={props.id} className={props.classLabel}>
            {props.label}
          </Form.Label>
        ) : (
          ""
        )}
        <div className="customInput_inner">
          <Form.Control
            as="textarea"
            rows={props.rows}
            disabled={props.disabled}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            onKeyDown={onKeyDown}
            placeholder={props.placeholder}
            onBlur={props.onBlur}
            onChange={props.onChange}
            maxLength={props.maxLength ? props.maxLength : ""}
            required={props.required}
            isInvalid={props.isInvalid}
            onPaste={(e) =>
              props.onpaste === "false" ? e.preventDefault() : props.onChange
            }
            onWheel={props.onWheel}
            autoComplete={props.onlyChar ? props.autoComplete : "off"}
            // pattern="\S(.*\S)?"
            title={props.title ? props.title : "Blank space are not allowed"}
            onInvalid={props.onInvalid}
            onInput={props.onInput}
            className={props.inputtext}
            readOnly={props.readOnly}
          />
          {props.children}
        </div>
        {props.error && <span className="error-message">{props.error}</span>}
      </Form.Group>
    </>
  );
};

export default Textarea;
