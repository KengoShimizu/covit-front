import React from 'react';
// common
import CommonStyle from '../../common/CommonStyle';

interface SelectProps {
  theme?: SelectThemes;
  propStyle?: {};
  handleChange: any;
  label: string;
  defaultLabel?: string;
  items: any[];
  name: string;
  defaultValue: number;
  labelColor?: any;
}

export enum SelectThemes {
  INIT     = 'INIT',
  REQUIRED = 'REQUIRED',
}

enum ModifierClassNames {
  INIT     = 'select-init',
  REQUIRED = 'select-required',
}

const Select: React.FC<SelectProps> = ({ theme = SelectThemes.INIT, propStyle = {}, handleChange, label, items, name, defaultLabel, defaultValue, labelColor }) => {
  return (
    <div className={["select", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label style={labelColor}>{label}<span>*</span></label>
      <select onChange={handleChange} name={name}>
        {defaultLabel ? <option value={0}>{defaultLabel}</option> : ""}
        {items.map((item: any, i: number) => {
          return (
            <option value={item.id} key={`option${i}`} selected={item.id === defaultValue}>{item.name}</option>
          )
        })}
      </select>
      <style jsx>
        {`
          .select-init{
          }

          .select {
            display: block;
            justify-content: center;
            align-items: center;
            max-width: 400px;
            margin-bottom: 32px;
          }

          .select label span {
            display: none;
          }

          .select label {
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextDarkGary};
            display: inline-block;
            margin-bottom: 8px;
          }

          .select select {
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5rem 0.75rem;
            width: 100%;
            height: 40px;
          }

          .select-required label span {
            display: inline;
            color: ${CommonStyle.TextAccent};
          }
        `}
      </style>
    </div>

  );
}

export default Select;