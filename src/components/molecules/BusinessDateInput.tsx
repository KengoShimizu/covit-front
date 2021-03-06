import React from 'react';
import Input from './../atoms/Input';
import CommonStyle from '../../common/CommonStyle';


interface BusinessDateInputProps {
  handleChange: any;
  dateInfo: any;
}

export const BusinessDateInput: React.FC<BusinessDateInputProps> = ({ handleChange, dateInfo }) => {
  return (
    <div className="container">
      <label>{dateInfo.label}</label>
      <input id={dateInfo.enLabel} type="checkbox" name='is_close' value={dateInfo.is_close} onChange={handleChange} style={{ marginRight: '4px' }} checked={dateInfo.is_close} /><label style={{ verticalAlign: 'text-bottom' }}>定休</label>
      <div style={dateInfo.is_close ? {visibility: 'hidden'} : {visibility: 'visible'}}>
        <Input id={dateInfo.enLabel} name='opening' label='' placeholder='00:00' content={dateInfo.opening} handleChange={handleChange} propStyle={{ width: '88px', display: 'inline-block', margin: '0' }} type="time" step={60}/> 
        <span style={{margin: '0 4px', display: 'inline-block'}}>〜</span>
        <Input id={dateInfo.enLabel} name='closing' label='' placeholder='00:00' content={dateInfo.closing} handleChange={handleChange} propStyle={{ width: '88px', display: 'inline-block', margin: '0' }} type="time" step={60}/>
      </div>
      <style jsx>{`
        .container {
          margin-bottom: 16px;
          display: flex;
          align-items: center;
        }
        label {
          font-size: ${CommonStyle.Caption};
          font-weight: bold;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}

