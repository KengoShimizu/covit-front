import React from 'react';

interface IconProps {
  theme?: IconThemes[];
  children?: React.ReactNode;
  className?: string;
  src: string;
  alt: string;
}

export enum IconThemes {
  INIT = 'INIT'
}

enum ModifierClassNames {
  INIT = 'icon-init'
}


const Icon: React.FC<IconProps> = ({theme = [IconThemes.INIT], children, className = '', src, alt}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <img 
      className={["icon", modifierClasses, className].join(' ')}
      src={src}
      alt={alt}>
      {children}
      <style jsx>
        {`
          .icon{
            cursor: pointer;
          }
          .icon-init{
          }
        `}
      </style>
    </img>
  );
}

export default Icon;