import React, { ReactNode } from 'react';
import { CommonStyle } from '../../common/CommonStyle';

interface InputProps {
  theme?: InputThemes;
  propStyle?: {};
  handleChange?: any;
  label: string;
  placeholder: string;
  content: string;
  icon?: React.ReactNode;
  readonly?: boolean;
}

export enum InputThemes {
  INIT     = 'INIT',
  REQUIRED = 'REQUIRED',
  DISABLED = 'DISABLED',
}

enum ModifierClassNames {
  INIT     = 'input-init',
  REQUIRED = 'input-required',
  DISABLED = 'input-disabled',
}

const Input: React.FC<InputProps> = ({ theme = InputThemes.INIT, propStyle = {}, handleChange, label, placeholder, content, icon, readonly }) => {
  return (
    <div className={["input", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label>{label}<span>*</span></label>
      <span className="input-icon">{icon}</span>
      <input defaultValue={content} onChange={handleChange} placeholder={placeholder} readOnly={readonly}/>
      <style jsx>
        {`
          .input-init{
          }

          .input {
            display: block;
            justify-content: center;
            align-items: center;
            padding: 1rem 1.5rem;
            max-width: 400px;
            position: relative;
          }

          .input-icon {
            display: inline-block;
            position: absolute;
            right: 2rem;
            padding-top: 5px;
          }

          .input label span {
            display: none;
          }

          .input label {
            font-size: ${CommonStyle.Caption};
            // color: ${CommonStyle.TextDarkGary};
            display: block;
            margin-bottom: 0.25rem;
          }

          .input input {
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5rem 0.75rem;
            width: 100%;
          }

          .input-disabled input {
            border: none;
          }

          .input-required label span {
            display: inline;
            color: ${CommonStyle.TextAccent};
          }
        `}
      </style>
    </div>

  );
}

export default Input;