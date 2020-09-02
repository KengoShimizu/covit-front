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
      <div className='inner-container'>
        <Text theme={[TextThemes.CAPTION]} propStyle={{ textAlign: 'center', margin: '8px 0' }}>お店が見つかりませんでしたか？</Text>
        <Text theme={[TextThemes.CAPTION]} propStyle={{ textAlign: 'center', margin: '8px 0' }}>お店の登録をリクエストしましょう！</Text>
        <Link to={RouteName.USER_SHOP_FORM}>
          <Button theme={[ButtonThemes.NORMAL]} propStyle={{ margin: '0 auto' }}>リクエストする</Button>
        </Link>
        <div className="img-container">
          <span><img src='/shop_request_img.png' alt='お店リクエスト画像' /></span>
        </div>
      </div>
      <style jsx>{`
        .container {
          border: 4px solid ${CommonStyle.AccentColor};
          box-sizing: border-box;
          border-radius: 12px;
          min-height: 230px;
          max-width: 330px;
          width: 90%;
          margin: 0 auto;
        }

        .inner-container {
          box-sizing: border-box;
          padding: 1rem 1rem 0;
        }

        .img-container {
          text-align: right;
        }
      `}</style>
    </div>
  );
}