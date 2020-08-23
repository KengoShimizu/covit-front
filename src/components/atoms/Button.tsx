import React from 'react';

interface ButtonProps {
  theme?: ButtonThemes[];
  children?: React.ReactNode;
  className?: string;
}

export enum ButtonThemes {
  GREEN = 'GREEN',
  GREEN_OUTLINE = 'GREEN_OUTLINE',
  GRAY_OUTLINE = 'GRAY_OUTLINE'
}

enum ModifierClassNames {
  GREEN = 'button-green',
  GREEN_OUTLINE = 'button-greenOutline',
  GRAY_OUTLINE = 'button-grayOutline'
}


const Button: React.FC<ButtonProps> = ({theme = [ButtonThemes.GREEN], children, className = ''}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <button className={["button", modifierClasses, className].join(' ')}>
      {children}
      <style jsx>
        {`
          .button{
            cursor: pointer;
          }
          .button-green{
            color: green;
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