import React from 'react';
// components
import HomeLayout from './../templates/HomeLayout';
import Text, { TextThemes } from './../atoms/Text';
import { RouteName } from '../../common/Const';

const propStyle = {
  textHead: {
    fontSize: '1.2em',
    padding: '52px 0 8px',
  }
}

const NotFound: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='存在しないページ' prevRef={RouteName.ROOT}>
      <div className="container">
        <div className="not-found-wrap">
          <div className="not-found-img-wrap">
            <img className="not-found-img" src='/404.png' alt="404" />
          </div>
          <div className="not-found-text">
            <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]} propStyle={propStyle.textHead}>
              お探しのページが見つかりません
            </Text>
            <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]}>
              ご指定のURLが間違っているかページが移動/削除された可能性があります。
            </Text>
          </div>
        </div>
      </div>
      <style jsx>{`
        .not-found-wrap{
          position: absolute;
          text-align: center;
          top: 46%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit- transform: translate(-50%, -50%);
        }
        .not-found-img{
          width: auto;
          height: 300px;
        }
        .not-found-text{
          width: 300px;
        }
      `}</style>
    </HomeLayout>
  );
}

export default NotFound;