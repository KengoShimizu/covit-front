import React from 'react';
import { StepCategory } from './../../types/StepCategory'
import {CommonStyle} from './../../common/CommonStyle';
import Alcohol from './../../img/covid-icon_alcohol.svg';
import Mask from './../../img/covid-icon_mask.svg';
import Airing from './../../img/covid-icon_airing.svg';
import Distance from './../../img/covid-icon_distance.svg';
import HealthCare from './../../img/covid-icon_health-care.svg';
import Text, { TextThemes } from './../atoms/Text';
import { Link } from 'react-router-dom';
import { Step } from './../../types/Step'

interface CheckSectionProps {
  stepCategory: StepCategory;
  handleChange: any;
}

export const CheckSection: React.FC<CheckSectionProps> = ({ stepCategory, handleChange }) => {
  return (
    <section className="container">
      <p className="label-container">
        <label>{stepCategory.content}</label>
      </p>
      <div className='checkbox-container'>
        {
          stepCategory.steps.map((step: Step) => {
            return(
              <p>
                <input type="checkbox" name={step.content} value={step.id} onChange={handleChange} /><label>{step.content}</label>
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