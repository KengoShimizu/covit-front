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
  const setUri = useContext(RedirectContext).setUri;

  return (
    <ul className='footer-action-bar' style={propStyle}>
      <FotterActionItem
        id='1'
        text='さがす'
        nextRef={RouteName.ROOT}
        svg={
          <React.Fragment>
            <rect/>
            <path d="M11 18C15.4183 18 19 14.4183 19 10C19 5.58172 15.4183 2 11 2C6.58172 2 3 5.58172 3 10C3 14.4183 6.58172 18 11 18Z"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 21L17 16"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </React.Fragment>}
        svgSize={24}
        onClick={() => setIsClicked(1)}
        isFocus={isClicked === 1 ? '_clicked' : ''}/>

      <FotterActionItem
        id='2'
        text='投稿する'
        nextRef={RouteName.SHOP_SEARCH_FOR_COMMENTS}
        svg={
          <React.Fragment>
            <rect/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8.00012V16.0001"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12H16"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </React.Fragment>}
        svgSize={24}
        onClick={() => {
          setUri({
            fromPath: RedirectFrom.NEW_COMMENT,
            shop: 0,
          });
          setIsClicked(2);
        }}
        isFocus={isClicked === 2 ? '_clicked' : ''}/>

      <FotterActionItem
        id='3'
        text='閲覧履歴'
        nextRef={RouteName.HISTORY}
        svg={
          <React.Fragment>
            <rect/>
            <path d="M19.6233 7.03847L18.6079 5.85722C17.747 4.95297 16.711 4.23335 15.5632 3.74215C14.4153 3.25096 13.1795 2.99845 11.931 3.00001C6.83481 3.00001 2.7002 7.13462 2.7002 12.2308C2.7002 17.3269 6.83481 21.4615 11.931 21.4615C13.8401 21.4614 15.7023 20.8696 17.2612 19.7676C18.8202 18.6655 19.9993 17.1074 20.6363 15.3077"  strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
            <path d="M22.7004 4.60682V9.92317C22.7004 10.1272 22.6194 10.3228 22.4751 10.4671C22.3308 10.6114 22.1352 10.6924 21.9312 10.6924H16.6148C15.9292 10.6924 15.586 9.86404 16.0706 9.37942L21.3874 4.06259C21.872 3.57702 22.7004 3.92125 22.7004 4.60682Z" className="option_fill"/>
            <path d="M10.7002 9.15381V14.1538H13.7002"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </React.Fragment>}
        svgSize={24}
        onClick={() => {
          setUri({
            fromPath: RedirectFrom.HISTORY,
            shop: 0,
          });
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
                <rect/>
                <path d="M12.1399 2.00093C6.51611 1.92497 1.92497 6.51589 2.00093 12.1394C2.07593 17.5326 6.46755 21.9241 11.8611 21.999C17.4858 22.076 22.076 17.485 21.999 11.8615C21.925 6.46734 17.5334 2.07592 12.1399 2.00093ZM18.2175 17.7326C18.1983 17.7533 18.1749 17.7696 18.1487 17.7802C18.1226 17.7908 18.0945 17.7956 18.0663 17.7941C18.0381 17.7926 18.0106 17.785 17.9857 17.7717C17.9609 17.7584 17.9392 17.7398 17.9223 17.7172C17.4923 17.1547 16.9657 16.673 16.3671 16.2948C15.1431 15.5093 13.5922 15.0766 12.0005 15.0766C10.4087 15.0766 8.85782 15.5093 7.63384 16.2948C7.03525 16.6729 6.50865 17.1543 6.07863 17.7168C6.06173 17.7393 6.04008 17.7579 6.01519 17.7712C5.99031 17.7845 5.96281 17.7921 5.93464 17.7936C5.90647 17.7951 5.87833 17.7903 5.8522 17.7797C5.82607 17.7691 5.8026 17.7528 5.78345 17.7321C4.37278 16.2094 3.57369 14.2196 3.53932 12.1442C3.46096 7.46628 7.29972 3.55078 11.9798 3.53925C16.6599 3.52771 20.4616 7.32783 20.4616 12C20.4632 14.1255 19.6617 16.1731 18.2175 17.7326V17.7326Z" className="option_fill"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.0005 6.61584C11.0524 6.61584 10.1953 6.9711 9.58616 7.61671C8.97705 8.26232 8.67274 9.15503 8.74149 10.1131C8.88091 12 10.3429 13.5383 12.0005 13.5383C13.6581 13.5383 15.1172 12 15.2595 10.1136C15.3306 9.16464 15.0287 8.28011 14.4095 7.62248C13.798 6.9735 12.9423 6.61584 12.0005 6.61584Z" className="option_fill"/>
              </React.Fragment>}
            svgSize={24}
            onClick={() => setIsClicked(4)}
            isFocus={isClicked === 4 ? '_clicked' : ''}/>
          :
            <FotterActionItem
              id='4'
              text='メニュー'
              nextRef={RouteName.MENU}
              svg={
                <React.Fragment>
                  <rect/>
                  <path d="M4.5 5.5H19.8572"  strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                  <path d="M4.5 12H19.8572"  strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                  <path d="M4.5 18.5H19.8572"  strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                </React.Fragment>}
              svgSize={24}
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
        .option_fill{
          fill: #8C8C8C;
        }
        .option_fill._clicked{
          fill: #DF6059;
        }
      `}</style>
    </ul>
  );
}

export default FooterActionBar;