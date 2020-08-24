import React from 'react';

interface ButtonProps {
  theme?: ButtonThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum ButtonThemes {
  INIT = 'INIT',
  NORMAL = 'NORMAL'
}

enum ModifierClassNames {
  INIT = 'button-init',
  NORMAL = 'normal-btn'
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
            background: #FF8A1F;
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: white;
          }
        `}
      </style>
    </button>
  );
}

export default Button;