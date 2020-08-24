import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';

interface ButtonProps {
  theme?: ButtonThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum ButtonThemes {
  INIT = 'INIT',
  NORMAL = 'NORMAL',
  SUBHEADER = 'SUBHEADER'
}

enum ModifierClassNames {
  INIT = 'button-init',
  NORMAL = 'normal-btn',
  SUBHEADER = 'subheader_back-btn'
}


const Button: React.FC<ButtonProps> = ({theme = [ButtonThemes.INIT], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    //style={propStyle}style直書き
    <button className={["button", modifierClasses].join(' ')} style={propStyle}>
      {children}
      <style jsx>
        {`
          .button{
            cursor: pointer;
          }
          .button-init{
          }
          .normal-btn {
            padding: 8px 32px;
            background: ${CommonStyle.AccentColor};
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: white;
          }
          .subheader_back-btn{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
          }
        `}
      </style>
    </button>
  );
}

export default Button;