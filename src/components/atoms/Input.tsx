import React from 'react';
// common
import CommonStyle from '../../common/CommonStyle';

interface InputProps {
  id?: string;
  theme?: InputThemes;
  propStyle?: {};
  handleChange?: any;
  label?: string;
  placeholder: string;
  content: string;
  icon?: React.ReactNode;
  readonly?: boolean;
  name?: string;
  type?: string; //phone or time
  labelColor?: any;
  step?: number;
}

export enum InputThemes {
  INIT = 'INIT',
  REQUIRED = 'REQUIRED',
  DISABLED = 'DISABLED',
  EDIT_PROFILE = 'EDIT_PROFILE',
}

enum ModifierClassNames {
  INIT = 'input-init',
  REQUIRED = 'input-required',
  DISABLED = 'input-disabled',
  EDIT_PROFILE = 'input-edit_profile',
}

const Input: React.FC<InputProps> = ({ id, theme = InputThemes.INIT, propStyle = {}, handleChange, label, placeholder, content, icon, readonly, name, type, labelColor, step }) => {
  return (
    <div className={["input", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label style={labelColor}>{label}<span>*</span></label>
      <div className="input-icon-container">
        <span className="input-icon">{icon}</span>
        <input type={type} className="input" id={id} value={content} onChange={handleChange} placeholder={placeholder} readOnly={readonly} name={name} step={step}/>
      </div>
      <style jsx>
        {`
          .input-init{
          }

          .input {
            display: block;
            justify-content: center;
            align-items: center;
            margin-bottom: 2rem;
            max-width: 400px;
          }

          .input-icon-container {
            position: relative;
          }

          .input-icon {
            display: inline-block;
            position: absolute;
            right: 1rem;
            top: 0.55rem;
          }

          .left-icon {
            left: 1rem;
          }

          .input label span {
            display: none;
          }

          .input label {
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextDarkGary};
            display: inline-block;
            margin-bottom: 8px;
          }

          .input input {
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 12px 10px;
            width: 100%;
          }

          .input-disabled input {
            border: none;
          }

          .input-required label span {
            display: inline;
            color: ${CommonStyle.TextAccent};
          }

          .input-edit_profile label{
            display: flex;
            justify-content: center;
          }

          input[type="time"]::-webkit-calendar-picker-indicator {
            display: none;
            background: none;
            -webkit-appearance: none;
          }

          input[type="time"]::-webkit-date-and-time-value { 
            margin-right: 1px;
          }
        `}
      </style>
    </div>

  );
}

export default Input;