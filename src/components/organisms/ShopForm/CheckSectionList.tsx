import React from 'react';
// components
import { CheckSection } from '../../molecules/CheckSection';
import StepCategory from '../../../types/StepCategory';

interface CheckSectionListProps {
  stepCategories: StepCategory[];
  setStepIDs: any;
  stepIDs: number[];
}

export const CheckSectionList: React.FC<CheckSectionListProps> = ({ stepCategories, setStepIDs, stepIDs }) => {

  const handleChange = (event: any) => {
    if(event.target.checked) {
      setStepIDs(stepIDs.concat([Number(event.target.value)]).filter((n: number)=> n !== event.target.value));
    } else {
      setStepIDs(stepIDs.filter((n: number) => n !== Number(event.target.value)));
    }
  }

  return (
    <div className="container">
      {stepCategories.map((stepCategory: StepCategory, i: number) => {
        return (
          <CheckSection stepCategory={stepCategory} handleChange={handleChange} key={`check-section${i}`} stepIDs={stepIDs}/>
        )
      })}
    </div>
  );
}