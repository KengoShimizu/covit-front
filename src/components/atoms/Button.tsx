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
  SUBHEADER = 'SUBHEADER',
  SUBBTN = 'SUBBTN',
  SHOPSNS = 'SHOPSNS',
}

enum ModifierClassNames {
  INIT = 'button-init',
  NORMAL = 'normal-btn',
  SUBHEADER = 'subheader_back-btn',
  SUBBTN = 'btn_sub',
  SHOPSNS = 'shop_sns-btn',
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
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .button-init{
          }
          .normal-btn {
            padding: 8px 24px;
            background: ${CommonStyle.AccentColor};
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextWhite};
          }
          .subheader_back-btn{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
          }
          .btn_sub{
            background: #E7E7E7;
            border-radius: 24px;
            color: ${CommonStyle.TextBlack};
            padding: 0px 12px;
            font-size: 12px;
            font-weight: bold;
            line-height: 19px;
          }
          .shop_sns-btn{
            width:44px;
            height: 44px;
          }
        `}
      </style>
    </button>
  );
}

export default Button;