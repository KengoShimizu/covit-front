import React from 'react';
// library
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Button, { ButtonThemes } from '../../atoms/Button';
import Title, { TitleThemes } from '../../atoms/Title';

interface HeaderProps {
  headerText?: string;
  prevRef?: string;
  history?: any;
  onClick?: any;
  noBtn?: any;
}

const Header: React.FC<HeaderProps> = ({ headerText, prevRef, history, onClick, noBtn }) => {
  return (
    <React.Fragment>
      {headerText &&
        <header className="header">
          <div className="header-content">
            {!noBtn &&
            <React.Fragment>
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
            </React.Fragment>
            }
            <Title theme={[TitleThemes.SUBHEADER]}>
            {headerText}
            </Title>
          </div>
          <style jsx>{`
          .header{
            position: fixed;
            z-index: 500;
            background: ${CommonStyle.BgWhite};
            width: 100%;
            height: 40px;
            text-align: center;
            border-bottom: 1px solid ${CommonStyle.BorderGray};
            margin-bottom: ${headerText === '閲覧履歴' ? '0px' : '24px'};
          }
          .header-content{
            max-width: 1000px;
            margin: auto;
          }
        `}</style>
        </header>}
    </React.Fragment>
  );
}

export default Header;