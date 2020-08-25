import React, { ReactNode } from 'react';
import { CommonStyle } from './../../common/CommonStyle';

interface FormProps {
  theme?: FormThemes;
  propStyle?: {};
  handleChange?: () => {};
  label: string;
  placeholder: string;
  content: string;
  icon?: React.ReactNode;
}

export enum FormThemes {
  INIT = 'INIT',
  REQUIRED = 'REQUIRED',
}

enum ModifierClassNames {
  INIT = 'form-init',
  REQUIRED = 'form-required',
}

const Form: React.FC<FormProps> = ({ theme = FormThemes.INIT, propStyle = {}, handleChange, label, placeholder, content, icon }) => {
  return (
    <div className={["form", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label>{label}<span>*</span></label>
      <span className="form-icon">{icon}</span>
      <input value={content} onChange={handleChange} name="content" placeholder={placeholder} />
      <style jsx>
        {`
          .form-init{
          }

          .form {
            display: block;
            justify-content: center;
            align-items: center;
            padding: 1rem 1.5rem;
          }

          .form-icon {
            display: inline-block;
            position: fixed;
            right: 2rem;
            padding-top: 5px;
          }

          .form label span {
            display: none;
          }

          .form label {
            font-size: ${CommonStyle.Caption};
            color: ${CommonStyle.TextDarkGary};
            display: block;
            margin-bottom: 0.25rem;
          }

          .form input {
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5rem 0.75rem;
            width: 100%;
            max-width: 400px;
          }

          .form-required label span {
            display: inline;
            color: ${CommonStyle.TextAccent};
          }
        `}
      </style>
    </div>

  );
}

export default Form;