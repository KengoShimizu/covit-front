import React, { useState, useEffect } from 'react';
// atoms
import Input from '../../atoms/Input'
import Button, { ButtonThemes } from '../../atoms/Button'
// molecules
import { BusinessDateInput } from '../../molecules/BusinessDateInput'
// others
import CommonStyle from '../../../common/CommonStyle';

interface ShopBusinessDateFormProps {
  setAddData: any;
  addData: any;
  defaultBusinessDate?: any;
}

export const ShopBusinessDateForm: React.FC<ShopBusinessDateFormProps> = ({ setAddData, addData, defaultBusinessDate }) => {
  const [businessDate, setBusinessDate] = useState([
    {
      number: 1,
      label: '月',
      enLabel: 'monday',
      opening: '00:00',
      closing: '00:00',
      is_close: false
    },
    {
      number: 2,
      label: '火',
      enLabel: 'tuesday',
      opening: '00:00',
      closing: '00:00',
      is_close: false
    },
    {
      number: 3,
      label: '水',
      enLabel: 'wednesday',
      opening: '00:00',
      closing: '00:00',
      is_close: false
    },
    {
      number: 4,
      label: '木',
      enLabel: 'thursday',
      opening: '00:00',
      closing: '00:00',
      is_close: false
    },
    {
      number: 5,
      label: '金',
      enLabel: 'friday',
      opening: '00:00',
      closing: '00:00',
      is_close: false
    },
    {
      number: 6,
      label: '土',
      enLabel: 'saturday',
      opening: '00:00',
      closing: '00:00',
      is_close: false
    },
    {
      number: 7,
      label: '日',
      enLabel: 'sunday',
      opening: '00:00',
      closing: '00:00',
      is_close: false
    },
  ]);
  const [openingAll, setOpeningAll] = useState('00:00');
  const [closingAll, setClosingAll] = useState('00:00');

  const handleAllChange = (event: any) => {
    switch (event.target.name) {
      case 'opening':
        setOpeningAll(event.target.value);
        break;
      case 'closing':
        setClosingAll(event.target.value);
        break;
    }
  }

  const allBusinessTimeChanged = () => {
    setBusinessDate(businessDate.map((date: any) => {
      date.opening = openingAll;
      date.closing = closingAll;
      return date;
    }));
  }

  const handleDateInfoChange = (event: any) => {
    var tempDate = businessDate.filter((date: any) => date.enLabel === event.target.id)[0];
    switch (event.target.name) {
      case 'opening':
        tempDate.opening = event.target.value;
        break;
      case 'closing':
        tempDate.closing = event.target.value;
        break;
      case 'is_close':
        tempDate.is_close = event.target.checked;
        break;
    }
    setBusinessDate(businessDate.filter((date: any) => date.enLabel !== event.target.id).concat([tempDate]).sort((a: any, b: any) => a.number > b.number ? 1 : -1));
  }

  useEffect(() => {
    setAddData({
      ...addData,
      shop: {
        ...addData.shop,
        business_date: JSON.stringify(businessDate)
      }
    })
  }, [businessDate])

  useEffect(() => {
    if(defaultBusinessDate){
      setBusinessDate(JSON.parse(defaultBusinessDate));
    }
  }, [defaultBusinessDate])

  return (
    <div className="container">
      <label className="business-date_label">営業時間</label>
      <div className="business-date_input-wrapper">
        <Input 
          name='opening'
          label=''
          handleChange={handleAllChange}
          placeholder='09:00'
          content={openingAll}
        　propStyle={{ width: '88px', display: 'inline-block', margin: '0' }} type="time" />
        <span style={{ margin: '0 4px', display: 'inline-block' }}>〜</span>
        <Input 
          name='closing'
          label=''
          handleChange={handleAllChange}
          placeholder='21:00'
          content={closingAll}
          propStyle={{ width: '88px', display: 'inline-block', margin: '0', marginRight: '16px' }}
          type="time" />
        <Button theme={[ButtonThemes.NORMAL]} onClick={allBusinessTimeChanged} propStyle={{ display: 'inline-block' }} >一括変更</Button>
      </div>
      {
        businessDate.map((dateInfo: any, i: number) => {
          return (
            <BusinessDateInput handleChange={handleDateInfoChange} dateInfo={dateInfo} key={`business-date${i}`}/>
          )
        })
      }
      <style jsx>{`
        .container{
          margin-bottom: 24px;
        }
        .business-date_label{
          font-size: ${CommonStyle.Caption};
          font-weight: bold;
          display: block;
          margin-bottom: 4px;
        }
        .business-date_input-wrapper{
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}