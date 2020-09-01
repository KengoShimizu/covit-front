import React, { useState, useContext } from 'react';
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
  const { authState } = useContext(AuthContext);
  const setFormPath = useContext(RedirectContext).setFromPath;

  const handleEnter = (event: any) => {
    setIsHover(parseInt(event.currentTarget.id))
  }

  const handleLeave = () => {
    setIsHover(0)
  }

  return (
    <div className='footer-action-bar' style={propStyle}>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='1'>
        <FotterActionItem
          icon={<img src={`/search${isHover === 1 ? '_clicked' : ''}.svg`} alt="検索" />}
          nextRef={RouteName.ROOT}
          style={{ paddingLeft: '35px' }} />
      </div>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={() => setFormPath(RedirectFrom.NEW_COMMENT)} id='2'>
        <FotterActionItem
          icon={<img src={`/plus-circle${isHover === 2 ? '_clicked' : ''}.svg`} alt="投稿" />}
          nextRef={RouteName.SHOP_SEARCH_FOR_COMMENTS} />
      </div>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={() => setFormPath(RedirectFrom.HISTORY)} id='3'>
        <FotterActionItem
          icon={<img src={`/Browsing-history${isHover === 3 ? '_clicked' : ''}.svg`} alt="閲覧履歴" />}
          nextRef={RouteName.HISTORY} />
      </div>
      {
        authState.isLogin ?
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='4'>
            <FotterActionItem
              icon={<img src={`/person-circle-outline${isHover === 4 ? '_clicked' : ''}.svg`} alt="メニュー" />}
              nextRef={RouteName.ACCOUNT_TOP}
              style={{ paddingRight: '35px' }} />
          </div>
          :
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='4'>
            <FotterActionItem icon={<img src={`/hamburger-outline${isHover === 4 ? '_clicked' : ''}.svg`} alt="メニュー" />}
              nextRef={RouteName.MENU}
              style={{ paddingRight: '35px' }} />
          </div>
      }
      <style jsx>{`
        .footer-action-bar{
          position: fixed;
          bottom: 41px;
          left: 50%;
          background-color: white;
          z-index: 1000;
          border-radius: 35px;
          display: flex;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
}

export default FooterActionBar;