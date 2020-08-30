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
      <input id={dateInfo.enLabel} type="checkbox" name='is_close' value={dateInfo.is_close} onChange={handleChange} style={{ marginRight: '4px' }} /><label style={{ verticalAlign: 'text-bottom' }}>定休</label>
      <Input id={dateInfo.enLabel} name='opening' label='' placeholder='00:00' content={dateInfo.opening} handleChange={handleChange} propStyle={{ width: '65px', display: 'inline-block', margin: '0' }} /> 
      <span style={{margin: '0 4px', display: 'inline-block'}}>〜</span>
      <Input id={dateInfo.enLabel} name='closing' label='' placeholder='00:00' content={dateInfo.closing} handleChange={handleChange} propStyle={{ width: '65px', display: 'inline-block', margin: '0' }} />
      <style jsx>
        {`
          .container {
            margin-bottom: 16px;
          }
          label {
            font-size: ${CommonStyle.Caption};
            font-weight: bold;
            margin-right: 8px;
          }
        `}
      </style>
    </div>
  );
}

