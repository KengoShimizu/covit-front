import React from 'react';

interface IconProps {
  theme?: IconThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}
export enum IconThemes {
  INIT = 'INIT',
  NORMAL = 'NORMAL',
  SMALL = 'SMALL'
}
enum ModifierClassNames {
  INIT = 'icon-init',
  NORMAL = 'icon-wrapper_normal',
  SMALL = 'icon-wrapper_small'
}


const Icon: React.FC<IconProps> = ({theme = [IconThemes.INIT], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <span 
      className={["icon_wrapper", modifierClasses].join(' ')} style={propStyle}
      >
      {children}
      <style jsx>
        {`
          .icon_wrapper{
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .icon_wrapper_lerge{
            width: 40px;
            height: 40px;
          }
          .icon_wrapper_normal{
            width: 24px;
            height: 24px;
          }
          .icon-wrapper_small{
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
        `}
      </style>
    </span>
  );
}

export default Icon;