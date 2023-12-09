import { Form } from "react-bootstrap";
import "./InputCustom.scss";

/** CUSTOM COMMON INPUT FIELD WITH DYNAMIC PROPS */
const InputCustom = (props) => {
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
            props.maxLength &&
            e.target.value.length === props.maxLength)) &&
          e.preventDefault()
      : props.onlyChar;
  };

  const onChange = (e) => {
    if (props.type === "number" && props.valueChange) {
      const { value } = e.target;
      if (value.toString()[0] == ".") {
        const formattedValue = value.replace(/^\./, "0.");
        return props.valueChange(formattedValue);
      } else {
        return props.onChange(e);
      }
    } else {
      return props.onChange(e);
    }
  };

  return (
    <>
      <Form.Group
        className={`customInput ${props.className}`}
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
            disabled={props.disabled}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            onKeyDown={onKeyDown}
            placeholder={props.placeholder}
            onBlur={props.onBlur}
            onChange={onChange}
            maxLength={props.maxLength ? props.maxLength : ""}
            required={props.required}
            min={props.min}
            max={props.max}
            isInvalid={props.isInvalid}
            onPaste={(e) =>
              props.onpaste === "false" ? e.preventDefault() : props.onChange
            }
            onWheel={props.onWheel}
            step={props.step}
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
        {props.smallText ? (
          <Form.Text id="" muted className="small-text-form">
            {props.smallText}
          </Form.Text>
        ) : (
          ""
        )}
      </Form.Group>
    </>
  );
};
export default InputCustom;
