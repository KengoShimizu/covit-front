import React from 'react';
// library
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Button, { ButtonThemes } from '../../atoms/Button';
import Title, { TitleThemes } from '../../atoms/Title';

interface SubHeaderProps {
  subHeaderText: string;
  prevRef?: string;
  history: any;
  onClick?: any;
}

const SubHeader: React.FC<SubHeaderProps> = ({subHeaderText, prevRef, history, onClick}) => {
  return (
    <div className="sub-header">
      {onClick &&
        <div onClick={onClick}>
          <Button theme={[ButtonThemes.SUBHEADER]}>
            <ChevronLeft size={24} color="#333" />
          </Button>
        </div>
      }
      {prevRef === '#' &&
        <div onClick={() => history.goBack()}>
          <Button theme={[ButtonThemes.SUBHEADER]}>
            <ChevronLeft size={24} color="#333" />
          </Button>
        </div>
      }
      {(prevRef && prevRef !== '#') &&
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
          position: fixed;
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

export default SubHeader;