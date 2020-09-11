import React from 'react';
// common
import CommonStyle from '../../common/CommonStyle';

interface InputProps {
  id?: string;
  theme?: InputThemes;
  IconTheme?: InputThemes;
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
  ICON_RIGHT = 'ICON_RIGHT',
  ICON_LEFT = 'ICON_LEFT',
}

enum ModifierClassNames {
  INIT = 'input-init',
  REQUIRED = 'input-required',
  DISABLED = 'input-disabled',
  EDIT_PROFILE = 'input-edit_profile',
  ICON_RIGHT = 'input-icon_right',
  ICON_LEFT = 'input-icon_left',
}


const Input: React.FC<InputProps> = ({ id, theme = InputThemes.INIT, IconTheme = InputThemes.INIT, propStyle = {}, handleChange, label, placeholder, content, icon, readonly, name, type, labelColor, step }) => {
  const isRight = IconTheme.includes(InputThemes.ICON_RIGHT)
  const isLeft = IconTheme.includes(InputThemes.ICON_LEFT)
  return (
    <div className={["input-container", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      {label ? <label className="input-label" style={labelColor}>{label}<span className="require-icon">*</span></label> : <React.Fragment/> }
      <div className="input-wrapper">
        <span className={["input-icon", ModifierClassNames[IconTheme]].join(' ')}>{icon}</span>
        <input 
          type={type} 
          className={`input ${isRight && 'input_right-icon'} ${isLeft && 'input_left-icon' }`}
          id={id}
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readonly}
          name={name}
          step={step}
        />
      </div>
      <style jsx>
        {`
          .input-init{
          }

          .input-container {
            display: block;
            justify-content: center;
            align-items: center;
            max-width: 400px;
            position: relative;
          }
          {/* ラベル */}
          .input-label {
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            text-align: left;
            color: ${CommonStyle.TextDarkGary};
            display: inline-block;
          }
          .require-icon {
            display: none;
            margin-left: 2px;
            display: inline;
            color: ${CommonStyle.TextAccent};
          }

          {/* インプット部分 */}
          .input-wrapper{
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 6px 8px;
            width: 100%;
          }

          {/* アイコン */}
          .input-icon {
          }
          .input-icon_right {
            order: 2;
          }
          .input-icon_left {
            order: 1;
          }
          
          {/* インプット */}
          .input{
            font-size: 16px;
            line-height: 24px;
            width: calc(100% - 20px);
            color: ${CommonStyle.TextBlack};
          }
          .input_right-icon{
            order: 1;
          }
          .input_left-icon{
            order: 2;
          }
          .input-disabled{
            border: none;
          }

          
          {/* プロフィール編集 */}
          .input-edit_profile{
            display: flex;
            flex-direction: column;
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