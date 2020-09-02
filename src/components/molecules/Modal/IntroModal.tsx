import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RouteName } from '../../../common/Const';
// components
import Button, { ButtonThemes } from '../../atoms/Button';

const propStyle = {
  shopModal1: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto 10px',
    width: '225px'
  },
  shopModal2: {
    margin: '0 auto 20px',
    width: '225px',
    color: CommonStyle.TextWhite,
    backgroundColor: CommonStyle.BorderGray,
  }
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
        <img src="/shop_pin.svg" alt="pin" className='intro-modal-pin'/>
        <h1 className="intro-mordal_title">
          <span className="intro-mordal_title_en">covEAT</span>
          <br />
          <span className="intro-mordal_title_jp">へようこそ！</span>
        </h1>
        <img className="intro-mordal_img" src='/charactor.svg' alt="" />
        <p className="intro-mordal_text">
          covEAT は感染対策に取り組む飲食店と感染対策を求めている人のためのグルメサービスです！
        </p>
        {/* propstyle */}
        <div onClick={handleInitModal}>
          <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.shopModal1}>
            <img className="intro-mordal_btn_icon" src='/service-icon.svg' alt="" />
            さっそく飲食店を探す
          </Button>
          <Link to={RouteName.REGISTER}>
            <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.shopModal2}>
              会員登録をして始める
            </Button>
          </Link>
        </div>
        <Link to=''>
          <p className="intro-mordal_link">covEATについてもっと知りたい！</p>
        </Link>
        <Link to=''>
          <p className="intro-mordal_link">covEATにお店を追加したい！</p>
        </Link>
      </div>
      <style jsx>{`
          .intro-mordal-back{
            height: 100%;
            width: 100%;
            z-index: 1100;
            position: absolute;
            top: 0;
          }
          .intro-modal-pin{
            position: absolute;
            top: -14px;
            left: 50%;
            transform: translateX(-50%);
          }
          .intro-mordal{
            visibility: visible;
            top: 144px;
            left: 50%;
            z-index: 1101;
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
            text-align: center;
            margin-bottom: 8px;
          }
          .intro-mordal_title_en{
            font-family: Century Gothic Pro,Franklin Gothic Medium, sans-serif;
            font-weight: bold;
            font-size: 22px;
            line-height: 24px;
            margin-bottom: 4px;
          }
          .intro-mordal_title_jp{
            font-family: 　”Hiragino Kaku Gothic ProN”,　"Hiragino Sans",　Meiryo, sans-serif;
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
          }
          .intro-mordal_img{
            width: auto;
            height: 120px;
            margin-bottom: 16px;
          }
          .intro-mordal_text{
            font-weight: bold;
            width: 90%;
            margin: 0 auto;
            text-align: left;
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