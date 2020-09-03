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
        text='投稿する'
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1399 2.00093C6.51611 1.92497 1.92497 6.51589 2.00093 12.1394C2.07593 17.5326 6.46755 21.9241 11.8611 21.999C17.4858 22.076 22.076 17.485 21.999 11.8615C21.925 6.46734 17.5334 2.07592 12.1399 2.00093ZM18.2175 17.7326C18.1983 17.7533 18.1749 17.7696 18.1487 17.7802C18.1226 17.7908 18.0945 17.7956 18.0663 17.7941C18.0381 17.7926 18.0106 17.785 17.9857 17.7717C17.9609 17.7584 17.9392 17.7398 17.9223 17.7172C17.4923 17.1547 16.9657 16.673 16.3671 16.2948C15.1431 15.5093 13.5922 15.0766 12.0005 15.0766C10.4087 15.0766 8.85782 15.5093 7.63384 16.2948C7.03525 16.6729 6.50865 17.1543 6.07863 17.7168C6.06173 17.7393 6.04008 17.7579 6.01519 17.7712C5.99031 17.7845 5.96281 17.7921 5.93464 17.7936C5.90647 17.7951 5.87833 17.7903 5.8522 17.7797C5.82607 17.7691 5.8026 17.7528 5.78345 17.7321C4.37278 16.2094 3.57369 14.2196 3.53932 12.1442C3.46096 7.46628 7.29972 3.55078 11.9798 3.53925C16.6599 3.52771 20.4616 7.32783 20.4616 12C20.4632 14.1255 19.6617 16.1731 18.2175 17.7326Z" fill="#8C8C8C"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8C8C8C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0005 6.61597C11.0524 6.61597 10.1953 6.97122 9.58616 7.61683C8.97705 8.26245 8.67274 9.15515 8.74149 10.1132C8.88091 12.0001 10.3429 13.5384 12.0005 13.5384C13.6581 13.5384 15.1172 12.0001 15.2595 10.1137C15.3306 9.16477 15.0287 8.28023 14.4095 7.6226C13.798 6.97363 12.9423 6.61597 12.0005 6.61597Z" fill="#8C8C8C"/>
                </svg>
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