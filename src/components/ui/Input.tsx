/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEvent, forwardRef } from "react";
import { InputDescType, InputTextType } from "../../libs";
import Theme from "../../styles/Theme";

const rootStyle = css`
  display: grid;
  gap: 4px;
`;

const containerStyle = css`
  border-radius: 4px;

  input {
    padding: 8px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #4a90e2;
    }
  }
`;

const descStyle = (type: InputTextType) => {
  let color = "";
  switch (type) {
    case "Normal":
      color = Theme.colors.neutral800;
      break;
    case "Danger":
      color = Theme.colors.danger;
      break;
    case "Warning":
      color = Theme.colors.warning;
      break;
    case "Info":
      color = Theme.colors.blue500;
      break;
  }

  return css`
    font-size: 12px;
    font-weight: 400;
    color: ${color};
  `;
};

interface InputProps {
  value: string;
  type?: string;
  label?: string;
  description?: InputDescType;
  placeholder?: string;
  prefix?: string;
  postfix?: string;
  setValue: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { 
    value = "",
    type = "text",
    label,
    description,
    placeholder,
    setValue,
  } = props;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div css={rootStyle}>
      <label>
        {label}
      </label>
      <div css={containerStyle}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
        />
      </div>
      { description && (
        <div>
          { description.icon && description.icon }
          <p css={descStyle(description.type)}>
            { description.text }
          </p>
        </div>
      ) }
    </div>
  );
});

Input.displayName = 'Input';

export default Input;