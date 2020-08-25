import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';

interface TextProps {
  theme?: TextThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum TextThemes {
  INIT = 'INIT',
  SUBHEADER = 'SUBHEADER'
}

enum ModifierClassNames {
  INIT = 'Text-init',
  SUBHEADER = 'subheader_Text'
}


const Text: React.FC<TextProps> = ({theme = [TextThemes.INIT], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <h1 className={["Text", modifierClasses].join(' ')} style={propStyle}>
      {children}
      <style jsx>
        {`
          .Text{
            color: ${CommonStyle.TextBlack};
          }
          .Text-init{
          }
          .subheader_Text{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextBlack};
            margin: 9px auto 7px auto;
          }
          .normal-text{
            text-size: ${CommonStyle.Caption};
            font-weight: bold;
          }
        `}
      </style>
    </h1>
  );
}

export default Text;