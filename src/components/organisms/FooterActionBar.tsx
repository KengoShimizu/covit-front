import React, { useState, useContext } from 'react';
// components
import FotterActionItem from './../molecules/FotterActionItem';
// context
import AuthContext from './../../context/CommonProvider';

const FooterActionBar: React.FC = () => {
  const [isHover, setIsHover] = useState(0);
  const { authState } = useContext(AuthContext);
  
  const handleEnter = (event: any) => {
    setIsHover(parseInt(event.currentTarget.id))
  }

  const handleLeave = () => {
    setIsHover(0)
  }

  return (
    <div className="footer-action-bar">
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='1'><FotterActionItem icon={<img src={`/search${isHover === 1 ? '_clicked' : ''}.svg`} alt="検索"/>} nextRef='/' style={{paddingLeft: '35px'}}/></div>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='2'><FotterActionItem icon={<img src={`/plus-circle${isHover === 2 ? '_clicked' : ''}.svg`} alt="投稿"/>} nextRef='/'/></div>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='3'><FotterActionItem icon={<img src={`/Browsing-history${isHover === 3 ? '_clicked' : ''}.svg`} alt="閲覧履歴"/>} nextRef='/history'/></div>
      {
        authState.isLogin ? 
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='4'><FotterActionItem icon={<img src={`/person-circle-outline${isHover === 4 ? '_clicked' : ''}.svg`} alt="メニュー"/>} nextRef='/accounts' style={{paddingRight: '35px'}}/></div>
          : 
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} id='4'><FotterActionItem icon={<img src={`/hamburger-outline${isHover === 4 ? '_clicked' : ''}.svg`} alt="メニュー"/>} nextRef='/' style={{paddingRight: '35px'}}/></div>
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