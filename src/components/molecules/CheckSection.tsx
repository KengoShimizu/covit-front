import React from 'react';
// types
import StepCategory from './../../types/StepCategory'
import Step from './../../types/Step'

interface CheckSectionProps {
  stepCategory: StepCategory;
  handleChange: any;
  stepIDs?: number[];
}

export const CheckSection: React.FC<CheckSectionProps> = ({ stepCategory, handleChange, stepIDs }) => {
  return (
    <section className="container">
      <p className="label-container">
        <label>{stepCategory.content}</label>
      </p>
      <div className='checkbox-container'>
        {
          stepCategory.steps?.map((step: Step, i: number) => {
            return (
              <p key={`checkbox${i}`}>
                <input type="checkbox" name={step.content} value={step.id} onChange={handleChange} checked={stepIDs?.includes(step.id)} /><label>{step.content}</label>
              </p>
            )
          })
        }
      </div>

      <style jsx>
        {`
        .container {
          margin-bottom: 32px;
        }

        .label-container {
          margin-bottom: 16px;
        }

        .label-container label {
          font-weight: bold;
        }

        .checkbox-container {
          margin: 0 0 16px 8px;
        }

        .checkbox-container p {
          margin-bottom: 8px;
        }

        .checkbox-container p input {
          vertical-align: baseline;
          margin-right: 8px;
        }
      `}
      </style>
    </section>
  );
}