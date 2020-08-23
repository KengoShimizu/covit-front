import React from 'react';

interface TitleProps {
  theme?: TitleThemes[];
  children?: React.ReactNode;
  className?: string;
}

export enum TitleThemes {
  INIT = 'INIT',
  SUB_HEADER = 'SUB_HEADER'
}

enum ModifierClassNames {
  INIT = 'title-init',
  SUB_HEADER = 'title-sub-header'
}


const Title: React.FC<TitleProps> = ({theme = [TitleThemes.INIT], children, className = ''}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <h1 className={["title", modifierClasses, className].join(' ')}>
      {children}
      <style jsx>
        {`
          .title{
            
          }
          .title-init{
          }
          .title-sub-header{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #333333;
            margin: 9px auto 7px auto;
          }
        `}
      </style>
    </h1>
  );
}

export default Title;