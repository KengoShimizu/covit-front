import React from 'react';
// components
import { CheckSection } from '../../molecules/CheckSection';
import StepCategory from '../../../types/StepCategory';

interface CheckSectionListProps {
  stepCategories: StepCategory[];
  setAddData: any;
  addData: any;
}

export const CheckSectionList: React.FC<CheckSectionListProps> = ({ stepCategories, setAddData, addData }) => {

  const handleChange = (event: any) => {
    if(event.target.checked) {
      setAddData({
        ...addData,
        step_ids: addData.step_ids.concat([Number(event.target.value)]).filter((n: number)=> n !== event.target.value)
      });
    } else {
      setAddData({
        ...addData,
        step_ids: addData.step_ids.filter((n: number) => n !== Number(event.target.value))
      });
    }
  }

  return (
    <div className="container">
      {stepCategories?.map((stepCategory: StepCategory, i: number) => {
        return (
          <CheckSection stepCategory={stepCategory} handleChange={handleChange} key={`check-section${i}`} stepIDs={addData.step_ids}/>
        )
      })}
    </div>
  );
}