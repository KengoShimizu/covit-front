import React from 'react';
// common
import CommonStyle from './../../common/CommonStyle';

interface TitleProps {
  theme?: TitleThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum TitleThemes {
  INIT = 'INIT',
  SUBHEADER = 'SUBHEADER'
}

enum ModifierClassNames {
  INIT = 'title-init',
  SUBHEADER = 'subheader_title'
}


const Title: React.FC<TitleProps> = ({theme = [TitleThemes.INIT], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <h1 className={["title", modifierClasses].join(' ')} style={propStyle}>
      {children}
      <style jsx>
        {`
          .title{
            
          }
          .title-init{
          }
          .subheader_title{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextBlack};
            margin: 9px auto 7px auto;
          }
          .title-icon{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextBlack};
            margin: 9px auto 7px auto;
          }
        `}
      </style>
    </h1>
  );
}

export default Title;