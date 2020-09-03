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
  initialAccent: number;
}

const FooterActionBar: React.FC<FooterActionBarProps> = ({ propStyle, initialAccent }) => {
  const [isClicked, setIsClicked] = useState(initialAccent);
  const { authState } = useContext(AuthContext);
  const setFormPath = useContext(RedirectContext).setFromPath;

  return (
    <ul className='footer-action-bar' style={propStyle}>
      <FotterActionItem
        id='1'
        text='さがす'
        nextRef={RouteName.ROOT}
        svg={
          <React.Fragment>
            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 22.0002L15.5 15.9999" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </React.Fragment>}
        svgSize={22}
        onClick={() => setIsClicked(1)}
        isFocus={isClicked === 1 ? '_clicked' : ''}/>

      <FotterActionItem
        id='2'
        text='さがす'
        nextRef={RouteName.SHOP_SEARCH_FOR_COMMENTS}
        svg={
          <React.Fragment>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8.00012V16.0001" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12H16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </React.Fragment>}
        svgSize={24}
        onClick={() => {
          setFormPath(RedirectFrom.NEW_COMMENT);
          setIsClicked(2);
        }}
        isFocus={isClicked === 2 ? '_clicked' : ''}/>

      <FotterActionItem
        id='3'
        text='閲覧履歴'
        nextRef={RouteName.HISTORY}
        svg={
          <React.Fragment>
            <path d="M18.9231 5.88466L17.9077 4.70341C17.0468 3.79916 16.0108 3.07954 14.863 2.58835C13.7151 2.09715 12.4793 1.84464 11.2308 1.8462C6.13462 1.8462 2 5.98081 2 11.077C2 16.1731 6.13462 20.3077 11.2308 20.3077C13.1399 20.3076 15.0021 19.7158 16.561 18.6138C18.12 17.5117 19.2991 15.9536 19.9361 14.1539" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
            <path className={`option_fill ${isClicked === 3 && '_clicked'}`} d="M22 3.45301V8.76936C22 8.97337 21.9189 9.16903 21.7747 9.31329C21.6304 9.45755 21.4347 9.53859 21.2307 9.53859H15.9144C15.2288 9.53859 14.8855 8.71023 15.3701 8.22561L20.687 2.90878C21.1716 2.42321 22 2.76744 22 3.45301Z" stroke="none"/>
            <path d="M10 8V13H13" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </React.Fragment>}
        svgSize={22}
        onClick={() => {
          setFormPath(RedirectFrom.HISTORY);
          setIsClicked(3);
        }}
        isFocus={isClicked === 3 ? '_clicked' : ''}/>
      
      {
        authState.isLogin ?
          <FotterActionItem
            id='4'
            text='メニュー'
            nextRef={RouteName.ACCOUNT_TOP}
            svg={
              <React.Fragment>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </React.Fragment>}
            svgSize={22}
            svgSizeHeight={18}
            onClick={() => setIsClicked(4)}
            isFocus={isClicked === 4 ? '_clicked' : ''}/>
          :
            <FotterActionItem
              id='4'
              text='メニュー'
              nextRef={RouteName.MENU}
              svg={
                <React.Fragment>
                  <path d="M2 3H18" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                  <path d="M2 9H18" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                  <path d="M2 15H18" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                </React.Fragment>}
              svgSize={22}
              svgSizeHeight={18}
              onClick={() => setIsClicked(4)}
              isFocus={isClicked === 4 ? '_clicked' : ''}/>
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
      `}</style>
    </ul>
  );
}

export default FooterActionBar;