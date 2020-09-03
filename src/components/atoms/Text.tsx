import React from 'react';
// common
import CommonStyle from './../../common/CommonStyle';

interface TextProps {
  theme?: TextThemes[];
  children?: React.ReactNode;
  propStyle?: {};
}

export enum TextThemes {
  INIT     = 'INIT',
  SMALL    = 'SMALL',
  CAPTION  = 'CAPTION',
  TEXT     = 'TEXT',
  SUBTITLE = 'SUBTITLE',
  LEFT     = 'LEFT',
  ERROR    = 'ERROR',
  DARKGRAY = 'DARKGRAY',
}

enum ModifierClassNames {
  INIT     = 'text-init',
  SMALL    = 'small-text',
  CAPTION  = 'caption-text',
  TEXT     = 'normal-text',
  SUBTITLE = 'subtitle-text',
  LEFT     = 'left-text',
  ERROR    = 'error-text',
  DARKGRAY = 'dark-gray-text',
}


const Text: React.FC<TextProps> = ({theme = [TextThemes.INIT], children, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <p className={["text", modifierClasses].join(' ')} style={propStyle}>
      {children}
      <style jsx>
        {`
          .text{
            color: ${CommonStyle.TextBlack};
          }
          .text-init{

          }
          .subtitle-text{
            font-size: ${CommonStyle.SubTitle};
            font-weight: bold;
            line-height: 1.7em;
          }
          .normal-text{
            font-size: ${CommonStyle.Text};
            line-height: 1.7em;
          }
          .caption-text{
            font-size: ${CommonStyle.Caption};
            font-weight: bold;
            line-height: 1.7em;
          }
          .small-text{
            font-size: ${CommonStyle.Smallest};
            font-weight: bold;
            line-height: 1.em;
          }
          .left-text {
            text-align: left;
          }
          .error-text {
            font-size: ${CommonStyle.Caption};
            color: ${CommonStyle.AccentColor};
            margin: -24px 0 30px;
          }
          .dark-gray-text{
            color: ${CommonStyle.TextDarkGary};
          }
        `}
      </style>
    </p>
  );
}

export default Text;