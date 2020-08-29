import React from 'react';
// library
import { Link } from 'react-router-dom';
import { User, LogIn, Menu } from 'react-feather';
import Cookies from 'universal-cookie';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import SubHeader from './SubHeader';

interface HeaderProps {
  subHeaderText?: string;
  prevRef?: string;
  history?: any;
  onClick?: any;
}

const Header: React.FC<HeaderProps> = ({subHeaderText, prevRef, history, onClick}) => {
  const cookies = new Cookies();
  return (
    <React.Fragment>
      <header className="header">
        <img className="service-logo" src="" alt=""/>
        <ul className="icon-list">
          <Link to='/history'>
            <li className="icon-list_option">
              <span className="icon-list_img-wrapper">
                <img className="icon-list_img" src='/history.svg' alt=""/>
              </span>
              <p className="icon-list_caption">閲覧履歴</p>
            </li>
          </Link>
          {cookies.get('token') ?
            <Link to='/accounts'>
              <li className="icon-list_option">
                <span className="icon-list_img-wrapper">
                  <User size={24} color="#fff" />
                </span>
                <p className="icon-list_caption">マイページ</p>
              </li>
            </Link>
            :
            <Link to='/accounts/register'>
              <li className="icon-list_option">
                <span className="icon-list_img-wrapper">
                  <LogIn size={24} color="#fff" />
                </span>
                <p className="icon-list_caption">ログイン</p>
              </li>
            </Link>
          }
          <li className="icon-list_option_menu">
            <Menu size={32} color="#fff" />
          </li>
        </ul>
      </header>
      {(subHeaderText && history && prevRef && !onClick) && <SubHeader subHeaderText={subHeaderText} prevRef={prevRef} history={history}/>}
      {(subHeaderText && history && !prevRef && onClick) && <SubHeader subHeaderText={subHeaderText} onClick={onClick} history={history}/>}
      <style jsx>{`
        *{
          margin:0;
          padding:0;
          border:0;
          outline:0;
          list-style:none;
        }
        a{
          text-decoration: none;
        }
        .container{
          width: 100%
        }
        header{
          height: 56px;
          width: 100%;
          position: fixed;
          background: ${CommonStyle.AccentColor};
          display: flex;
          justify-content: space-between;
          padding: 6px 10px;
          box-sizing: border-box;
          z-index: 2000;
        }
        .icon-list{
          display: flex;
          padding: 0;
        }
        .icon-list_option{
          text-align: center;
          width: 50px;
          height: 44px;
          margin-right: 4px;
        }
        .icon-list_option_menu{
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-list_img-wrapper{
          margin: 0 auto;
          width: 44px;
          height: 32px;
          display:flex;
          justify-content: center;
          align-items: center;
        }
        .icon-list_img{
          width: 28px;
          height: auto;
        }
        .icon-list_caption{
          font-size: 8px;
          line-height: 12px;
          color: white;
        }
      `}</style>
    
    </React.Fragment>
  );
}

export default Header;