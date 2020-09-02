import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// common
import { RedirectFrom, RouteName } from './../../common/Const';
// components
import FotterActionItem from '../molecules/Footer/FotterActionItem';
// context
import AuthContext from './../../context/CommonProvider';
import RedirectContext from './../../context/RedirectContext';

interface FooterActionBarProps {
  propStyle?: any;
}

const FooterActionBar: React.FC<FooterActionBarProps> = ({ propStyle }) => {
  const [isHover, setIsHover] = useState(0);
  const [isClicked, setIsClicked] = useState(1);
  const { authState } = useContext(AuthContext);
  const setFormPath = useContext(RedirectContext).setFromPath;

  const handleEnter = (event: any) => {
    setIsHover(parseInt(event.currentTarget.id))
  }

  const handleLeave = () => {
    setIsHover(0)
  }

  return (
    <ul className='footer-action-bar' style={propStyle}>
      <li className={`footer-action-bar_option ${isClicked === 1 && '_clicked'}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='1' onClick={() => setIsClicked(1)}>
        <Link to={RouteName.ROOT}>
          <div className="footer-action-bar_btn">
            <span className="footer-action-bar_icon-wrapper">
              <svg className={`footer-action-bar_icon ${isClicked === 1 && '_clicked'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 22.0002L15.5 15.9999" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <p className={`footer-action-bar_caption ${isClicked === 1 && '_clicked'}`}>さがす</p>
          </div>
        </Link>
      </li>
      <li className={`footer-action-bar_option ${isClicked === 2 && '_clicked'}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='2' onClick={() => {
          setFormPath(RedirectFrom.NEW_COMMENT);
          setIsClicked(2);
        }}>
        <Link to={RouteName.SHOP_SEARCH_FOR_COMMENTS}>
          <div className="footer-action-bar_btn">
            <span className="footer-action-bar_icon-wrapper">
              <svg className={`footer-action-bar_icon ${isClicked === 2 && '_clicked'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8.00012V16.0001" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <p className={`footer-action-bar_caption ${isClicked === 2 && '_clicked'}`}>投稿する</p>
          </div>
        </Link>
      </li>
      <li className={`footer-action-bar_option ${isClicked === 3 && '_clicked'}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='3' onClick={() => {
        setFormPath(RedirectFrom.HISTORY);
        setIsClicked(3);
        }}>
        <Link to={RouteName.HISTORY}>
          <div className="footer-action-bar_btn">
            <span className="footer-action-bar_icon-wrapper">
            <svg className={`footer-action-bar_icon ${isClicked === 3 && '_clicked'}`} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.9231 5.88466L17.9077 4.70341C17.0468 3.79916 16.0108 3.07954 14.863 2.58835C13.7151 2.09715 12.4793 1.84464 11.2308 1.8462C6.13462 1.8462 2 5.98081 2 11.077C2 16.1731 6.13462 20.3077 11.2308 20.3077C13.1399 20.3076 15.0021 19.7158 16.561 18.6138C18.12 17.5117 19.2991 15.9536 19.9361 14.1539" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
            <path className={`option_fill ${isClicked === 3 && '_clicked'}`} d="M22 3.45301V8.76936C22 8.97337 21.9189 9.16903 21.7747 9.31329C21.6304 9.45755 21.4347 9.53859 21.2307 9.53859H15.9144C15.2288 9.53859 14.8855 8.71023 15.3701 8.22561L20.687 2.90878C21.1716 2.42321 22 2.76744 22 3.45301Z" stroke="none"/>
            <path d="M10 8V13H13" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </span>
            <p className={`footer-action-bar_caption ${isClicked === 3 && '_clicked'}`}>閲覧履歴</p>
          </div>
        </Link>
      </li>
      {
        authState.isLogin ?
          <li className={`footer-action-bar_option ${isClicked === 4 && '_clicked'}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='4' onClick={() => setIsClicked(4)}>
            <Link to={RouteName.ACCOUNT_TOP}>
              <div className="footer-action-bar_btn">
                <span className="footer-action-bar_icon-wrapper">
                <svg className={`footer-action-bar_icon ${isClicked === 4 && '_clicked'}`} width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H20" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M2 9H20" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M2 16H20" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                </svg>
                </span>
                <p className={`footer-action-bar_caption ${isClicked === 4 && '_clicked'}`}>メニュー</p>
              </div>
            </Link>
          </li>
          :
          <li className={`footer-action-bar_option ${isClicked === 4 && '_clicked'}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='4' onClick={() => setIsClicked(4)}>
            <Link to={RouteName.MENU}>
              <div className="footer-action-bar_btn">
                <span className="footer-action-bar_icon-wrapper">
                <svg className={`footer-action-bar_icon ${isClicked === 4 && '_clicked'}`} width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3H18" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M2 9H18" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M2 15H18" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                </svg>
                </span>
                <p className={`footer-action-bar_caption ${isClicked === 4 && '_clicked'}`}>メニュー</p>
              </div>
            </Link>
          </li>
      }
      <style jsx>{`
        .footer-action-bar{
          position: fixed;
          bottom: 44px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 32px;
          width: 288px;
          height: 60px;
          box-sizing: border-box;
          background-color: white;
          z-index: 1000;
          border-radius: 60px;
          display: flex;
        }
        .footer-action-bar_option:not(:last-child){
          margin-right: 16px;
        }
        .footer-action-bar_option{
        }
        .footer-action-bar_btn{
          width: 44px;
          height: 44px;
        }
        .footer-action-bar_icon-wrapper{
          height: 28px;
          width: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4px;
        }
        .footer-action-bar_icon{
          height: 20px;
          width: auto;
          stroke: #8C8C8C;
        }
        .footer-action-bar_caption{
          font-size: 8px;
          text-align: center;
          font-weight: bold;
          color: #8C8C8C;
        }
        .option_fill{
          fill: #8C8C8C;
        }
        .footer-action-bar_icon._clicked{
          stroke: #DF6059;
        }
        .footer-action-bar_caption._clicked{
          color: #DF6059;
        }
        .option_fill._clicked{
          fill: #DF6059;
        }
        
      `}</style>
    </ul>
  );
}

export default FooterActionBar;