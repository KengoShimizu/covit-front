import React from 'react';

interface ButtonProps {
  theme?: ButtonThemes[];
  children?: React.ReactNode;
  className?: string;
}

export enum ButtonThemes {
  INIT = 'INIT',
  GRAY_OUTLINE = 'GRAY_OUTLINE'
}

enum ModifierClassNames {
  INIT = 'button-init',
  GRAY_OUTLINE = 'button-grayOutline'
}


const Button: React.FC<ButtonProps> = ({theme = [ButtonThemes.INIT], children, className = ''}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <button className={["button", modifierClasses, className].join(' ')}>
      {children}
      <style jsx>
        {`
          .button{
            cursor: pointer;
          }
          .button-init{
          }
          .button.button-grayOutline {
            border: solid 1px #808080;
            color: #333;
          }
        `}
      </style>
    </button>
  );
}

export default Button;