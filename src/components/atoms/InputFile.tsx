import React from 'react';
// library
import { Image } from 'react-feather';
// common
import CommonStyle from '../../common/CommonStyle';

interface InputFileProps {
  theme?: InputFileThemes;
  propStyle?: {};
  handleChange?: any;
  label: string;
  icon?: React.ReactNode;
}

export enum InputFileThemes {
  INIT = 'INIT',
}

enum ModifierClassNames {
  INIT = 'input-file-init',
}

const InputFile: React.FC<InputFileProps> = ({ theme = InputFileThemes.INIT, propStyle = {}, handleChange, label, icon }) => {
  return (
    <div className={["input-file", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label>
        <div>
          <Image /><span style={{verticalAlign: 'super', marginLeft: '8px'}}>{label}</span>
        </div>
        <input type="file" onChange={handleChange} name='image' accept="image/*" />
      </label>
      <style jsx>
        {`
          .input-file-init{
          }

          .input-file {
            display: block;
            justify-content: center;
            align-items: center;
            margin-bottom: 2rem;
            max-width: 400px;
            position: relative;
          }

          .input-file-icon {
            display: inline-block;
            position: absolute;
            right: 2rem;
            padding-top: 5px;
          }

          .input-file label {
            font-size: ${CommonStyle.Caption};
            font-weight: bold;
            color: ${CommonStyle.TextDarkGary};
            display: block;
            margin-bottom: 0.25rem;
          }

          .input-file input {
            display: none;
          }
        `}
      </style>
    </div>

  );
}

export default InputFile;