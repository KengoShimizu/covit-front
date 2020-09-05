import React from 'react';
// common
import CommonStyle from './../../common/CommonStyle';

interface ButtonProps {
  theme?: ButtonThemes[];
  children?: React.ReactNode;
  propStyle?: {};
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void);
}

export enum ButtonThemes {
  INIT = 'INIT',
  NORMAL = 'NORMAL',
  SUBHEADER = 'SUBHEADER',
  SUBBTN = 'SUBBTN',
  SHOPSNS = 'SHOPSNS',
  SUBNORMAL = 'SUBNORMAL',
}

enum ModifierClassNames {
  INIT = 'button-init',
  NORMAL = 'normal-btn',
  SUBHEADER = 'subheader_back-btn',
  SUBBTN = 'btn_sub',
  SHOPSNS = 'shop_sns-btn',
  SUBNORMAL = 'normal-btn_gray',
}


const Button: React.FC<ButtonProps> = ({theme = [ButtonThemes.INIT], children, propStyle = {}, onClick}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    //style={propStyle}style直書き
    <button className={["button", modifierClasses].join(' ')} style={propStyle} onClick={onClick}>
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
            padding: 4px 16px;
            background: ${CommonStyle.AccentColor};
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextWhite};
          }
          .normal-btn_gray {
            padding: 8px 24px;
            background: ${CommonStyle.BgGray};
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextBlack};
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
            padding: 4px 12px;
            font-size: 12px;
            font-weight: bold;
            line-height: 18px;
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