import React, { useState, useEffect } from 'react';
// library
import queryString from 'query-string';
// components
import HomeLayout from './../templates/HomeLayout';
import Text, { TextThemes } from './../atoms/Text';

const propStyle = {
  textHead: {
    fontSize: '1.2em',
    padding: '52px 0 8px',
  }
}

const ServerError: React.FC = (props: any) => {
  const qs = queryString.parse(props.location.search);

  const [message, setMessage] = useState('') 

  useEffect(() => {
    if (qs.state === 'sns-error') setMessage('指定したSNSアカウントには、メールアドレスが登録されていません。もしくは他のログイン方法で使われているメールアドレスです。');
    else setMessage('')
  }, [])

  return (
    <HomeLayout headerText='サーバーエラー' prevRef='#' history={props.history}>
      <div className="container">
        <div className="server-error-wrap">
          <div className="server-error-img-wrap">
            <img className="server-error-img" src='/404.png' alt="500" />
          </div>
          <div className="server-error-text">
            <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]} propStyle={propStyle.textHead}>
              申し訳ございません。サーバーエラーが発生しました。
            </Text>
            <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]}>
              {message}
            </Text>
          </div>
        </div>
      </div>
      <style jsx>{`
        .server-error-wrap{
          position: absolute;
          text-align: center;
          top: 46%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit- transform: translate(-50%, -50%);
        }
        .server-error-img{
          width: auto;
          height: 300px;
        }
        .server-error-text{
          width: 300px;
        }
      `}</style>
    </HomeLayout>
  );
}

export default ServerError;