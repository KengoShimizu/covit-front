import React, { ReactNode } from 'react';
import { CommonStyle } from '../../common/CommonStyle';

interface TextareaProps {
  theme?: TextareaThemes;
  propStyle?: {};
  handleChange: any;
  label: string;
  subtitle?: string;
  content?: string;
  rows?: number;
}

export enum TextareaThemes {
  INIT     = 'INIT',
  REQUIRED = 'REQUIRED',
}

enum ModifierClassNames {
  INIT     = 'textarea-init',
  REQUIRED = 'textarea-required',
}

const Textarea: React.FC<TextareaProps> = ({ theme = TextareaThemes.INIT, propStyle = {}, handleChange, label, content, rows = 5, subtitle}) => {
  return (
    <div className={["textarea", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label>{label}<span>*</span></label>
      <p className="subtitle">{subtitle}</p>
      <textarea onChange={handleChange} rows={rows}>
        {content}
      </textarea>
      <style jsx>
        {`
          .textarea-init{
          }

          .textarea {
            display: block;
            justify-content: center;
            align-items: center;
            max-width: 400px;
          }

          .textarea label span {
            display: none;
          }

          .textarea label {
            font-size: ${CommonStyle.Caption};
            font-weight: bold;
            text-align: left;
            display: block;
            margin-bottom: 0.25rem;
          }

          .subtitle {
            margin: 16px 0 16px 8px;
            text-align: left;
            font-size: 14px;
          }

          .textarea textarea {
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5rem 0.75rem;
            width: 100%;
          }

          .textarea-disabled textarea {
            border: none;
          }

          .textarea-required label span {
            display: inline;
            color: ${CommonStyle.TextAccent};
          }
        `}
      </style>
    </div>

  );
}

export default Textarea;