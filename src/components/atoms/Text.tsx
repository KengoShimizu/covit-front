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
  LPSUBTITLE = 'LPSUBTITLE',
  LPSUBTITLEACCENT = 'LPSUBTITLEACCENT',
  LPTEXT = 'LPTEXT',
  LPTEXTACCENT = 'LPTEXTACCENT',
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
  LPSUBTITLE = 'lp_subtitle',
  LPSUBTITLEACCENT = 'lp_subtitle_accent',
  LPTEXT = 'lp_text',
  LPTEXTACCENT = 'lp_text_accent',
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
          .lp_subtitle{
            font-weight: bold;
            line-height: 1.7em;
            font-size: ${CommonStyle.SubTitle}
          }
          .lp_subtitle_accent{
            color: ${CommonStyle.AccentColor};
            font-weight: bold;
            line-height: 1.7em;
            font-size: ${CommonStyle.SubTitle};
          }
          .lp_text{
            font-weight: bold;
            line-height: 1.7em;
            font-size: ${CommonStyle.Caption}
          }
          .lp_text_accent{
            color: ${CommonStyle.AccentColor};
            font-weight: bold;
            line-height: 1.7em;
            font-size: ${CommonStyle.Caption}
          }
        `}
      </style>
    </p>
  );
}

export default Text;