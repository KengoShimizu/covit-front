import React, { ReactNode } from 'react';
import { CommonStyle } from '../../common/CommonStyle';

interface InputProps {
  theme?: InputThemes;
  propStyle?: {};
  handleChange?: () => {};
  label: string;
  placeholder: string;
  content: string;
  icon?: React.ReactNode;
}

export enum InputThemes {
  INIT = 'INIT',
  REQUIRED = 'REQUIRED',
}

enum ModifierClassNames {
  INIT = 'input-init',
  REQUIRED = 'input-required',
}

const Input: React.FC<InputProps> = ({ theme = InputThemes.INIT, propStyle = {}, handleChange, label, placeholder, content, icon }) => {
  return (
    <div className={["input", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label>{label}<span>*</span></label>
      <span className="input-icon">{icon}</span>
      <input value={content} onChange={handleChange} name="content" placeholder={placeholder} />
      <style jsx>
        {`
          .input-init{
          }

          .input {
            display: block;
            justify-content: center;
            align-items: center;
            padding: 1rem 1.5rem;
          }

          .input-icon {
            display: inline-block;
            position: fixed;
            right: 2rem;
            padding-top: 5px;
          }

          .input label span {
            display: none;
          }

          .input label {
            font-size: ${CommonStyle.Caption};
            color: ${CommonStyle.TextDarkGary};
            display: block;
            margin-bottom: 0.25rem;
          }

          .input input {
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5rem 0.75rem;
            width: 100%;
            max-width: 400px;
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