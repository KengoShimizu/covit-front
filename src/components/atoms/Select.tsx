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
    <div className={["select_container", ModifierClassNames[theme]].join(' ')} style={propStyle}>
      <label className="select_label" style={labelColor}>{label}<span className="required-icon">*</span></label>
      <div className="select_wrapper">
        <select className="selectbox" onChange={handleChange} name={name}>
          {defaultLabel ? <option value={0}>{defaultLabel}</option> : ""}
          {items?.map((item: any, i: number) => {
            return (
              <option value={item.id} key={`option${i}`} selected={item.id === defaultValue}>{item.name}</option>
            )
          })}
        </select>
      </div>
      <style jsx>
        {`
          .select-init{
          }

          .select-container{
            display: block;
            justify-content: center;
            align-items: center;
            position:relative;
            max-width: 400px;
          }
          .required-icon{
            display: none;
          }
          .select-required label span {
            display: inline;
            color: ${CommonStyle.TextAccent};
          }

          .select_label{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: ${CommonStyle.TextDarkGary};
            display: block;
            margin-bottom: 8px;
          }
          .selectbox{
            border: 1px solid ${CommonStyle.BorderGray};
            box-sizing: border-box;
            border-radius: 4px;
            padding: 6px 24px 6px 8px;
            width: 100%;
            font-size:1em;
            position: relative;
            text-indent: 0.01px;
            text-overflow: '';
            background: none transparent;
            vertical-align: middle;
            color: inherit;
          }
          select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          select:focus {
            outline: none;
          }
          select option{
            background-color: #fff;
            color: #333;
          }
          select::-ms-expand {
            display: none;
          }
          select:-moz-focusring { 
            color: transparent; 
            text-shadow: 0 0 0 #828c9a;
          }
          .select_wrapper{
            position: relative;
            display: inline-block;
          }
          
          .select_wrapper:after {
            position: absolute;
            display: block;
            content: '';
            right: 8px;
            top: 10px;
            width: 6px;
            height: 6px;
            border-top: 2px solid #333;
            border-right: 2px solid #333;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
          }
          
        `}
      </style>
    </div>

  );
}

export default Select;