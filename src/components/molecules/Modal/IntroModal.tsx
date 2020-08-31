import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Button, { ButtonThemes } from '../../atoms/Button';

const propStyle = {
  shopModal: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto 40px auto'
  },
}

interface IntroModalProps {
  initModalIsOpen: boolean;
  handleInitModal: any;
}

const IntroModal: React.FC<IntroModalProps> = ({ initModalIsOpen, handleInitModal }) => {
  return (
    <React.Fragment>
      {!initModalIsOpen && <div className='intro-mordal-back' onClick={() => handleInitModal}></div>}
      <div className={initModalIsOpen ? 'intro-mordal disable' : 'intro-mordal'}>
        <h1 className="intro-mordal_title">PAND-MEAL<br /> <span className="intro-mordal_title_jp">へようこそ！</span></h1>
        <img className="intro-mordal_img" src='/charactor.png' alt="" />
        <p className="intro-mordal_text">
          PAND-MEALは感染対策に取り組む飲食店と感染対策を求めている人のためのグルメサービスです！
          </p>
        {/* propstyle */}
        <div onClick={handleInitModal}>
          <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.shopModal}>
            <img className="intro-mordal_btn_icon" src='/service-icon.svg' alt="" />
              さっそく飲食店を探す
            </Button>
        </div>
        <Link to=''>
          <p className="intro-mordal_link">PAND-MEALについてもっと知りたい！</p>
        </Link>
        <Link to=''>
          <p className="intro-mordal_link">PAND-MEALにお店を追加したい！</p>
        </Link>
      </div>
      <style jsx>{`
          .intro-mordal-back{
            height: 100%;
            width: 100%;
            z-index: 999;
            position: absolute;
            top: 0;
          }
          .intro-mordal{
            visibility: visible;
            top: 144px;
            left: 50%;
            z-index: 1000;
            transform: translateX(-50%);
            -webkit- transform: translateX(-50%);
            position: fixed;
            background: ${CommonStyle.BgWhite};
            border-radius: 8px;
            max-width: 280px;
            width: 80%;
            padding: 36px 16px;
            box-sizing: border-box;
            text-align: center;
            transition-duration: .5s;
          }
          .intro-mordal_title{
            font-family: Century Gothic Pro;
            font-weight: bold;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 4px;
          }
          .intro-mordal_title_jp{
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
          }
          .intro-mordal_title_img{
            width: 186px;
            height: auto;
            margin-bottom: 8px;
          }
          .intro-mordal_text{
            font-weight: bold;
            width: 100%;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 24px;
          }
          .intro-mordal_link{
            color: ${CommonStyle.TextDarkGary};
            text-align: center;
            font-size: 12px;
            line-height: 19px;
          }
          .intro-mordal_btn_icon{
            margin-right: 4px;
          }
          .disable{
            visibility: hidden;
            opacity: 0;
          }
        `}</style>
    </React.Fragment>
  );
};

export default IntroModal;