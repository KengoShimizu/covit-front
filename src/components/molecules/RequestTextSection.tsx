import React from 'react';
// library
import { Link } from 'react-router-dom';
// atoms
import Button, { ButtonThemes } from './../atoms/Button'
import Text, { TextThemes } from './../atoms/Text'
// common
import CommonStyle from './../../common/CommonStyle';
import { RouteName } from '../../common/Const';

export const RequestTextSection: React.FC = () => {
  return (
    <div className="container">
      <div className="inner-container">
        <Text theme={[TextThemes.SMALL]} propStyle={{ textAlign: 'center', marginBottom: '4px' }}>お店が見つかりませんでしたか？</Text>
        <Text theme={[TextThemes.CAPTION]} propStyle={{ textAlign: 'center', marginBottom: '12px' }}>お店の登録をリクエストしましょう！</Text>
        <Link to={RouteName.USER_SHOP_FORM}>
          <Button theme={[ButtonThemes.NORMAL]} propStyle={{ margin: '0 auto 100px auto' }}>リクエストする</Button>
        </Link>
      </div>
      <div className="request-img_container">
        <img className="request-img" src='/shop_request_img.png' alt='' />
      </div>
      <style jsx>{`
        .container {
          position: relative;
          border: 4px solid ${CommonStyle.AccentColor};
          box-sizing: border-box;
          padding: 24px 0 0 0;
          border-radius: 12px;
          min-height: 230px;
          max-width: 400px;
          width: 90%;
          margin: 0 auto;
          overflow: hidden;
        }
        .inner-container{
          z-index: 10;
          position: relative;
        }
        .request-img_container{
          position: absolute;
          text-align: right;
          bottom: -2px;
          height: 120px;
          width: auto;
          right: 0;
          z-index: 1;
        }
        .request-img{
          height: 100%;
          width: auto;
        }
      `}</style>
    </div>
  );
}