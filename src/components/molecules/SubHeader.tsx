import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';
import Button, { ButtonThemes } from './../atoms/Button';
import Title, { TitleThemes } from './../atoms/Title';
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';

interface SubHeaderProps {
  subHeaderText: string;
  prevRef: string;
  history: any;
}

export const SubHeader: React.FC<SubHeaderProps> = ({subHeaderText, prevRef, history}) => {
  return (
    <div className="sub-header">
      {subHeaderText === '閲覧履歴' ?
        <div onClick={() => history.goBack()}>
          <Button theme={[ButtonThemes.SUBHEADER]}>
            <ChevronLeft size={24} color="#333" />
          </Button>
        </div>
        :
        <Link to={prevRef}>
          <Button theme={[ButtonThemes.SUBHEADER]}>
            <ChevronLeft size={24} color="#333" />
          </Button>
        </Link>
      }
      <Title theme={[TitleThemes.SUBHEADER]}>
        {subHeaderText}
      </Title>
      <style jsx>{`
        .sub-header{
          padding-top: 56px;
          background: ${CommonStyle.BgWhite};
          width: 100%;
          height: 40px;
          text-align: center;
          margin-bottom: ${subHeaderText === '閲覧履歴' ? '0px' : '8px'};
        }
      `}</style>
    </div>
  );
}

