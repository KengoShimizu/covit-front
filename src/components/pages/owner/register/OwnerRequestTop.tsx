import React from 'react';
// components
import HomeLayout from '../../../templates/HomeLayout';
import Text, { TextThemes } from '../../../atoms/Text';
import Button, { ButtonThemes } from '../../../atoms/Button';


export const OwnerRequestTop: React.FC = (props: any) => {
  const onClick = () => {
    window.location.href = '/owners/shopform';
  }

  return (
    <HomeLayout subHeaderText="お店の追加" prevRef="/" history={props.history}>
      <div className="container">
        <div className="img-container">
          <img className="image" src='/register_top.png' /> 
        </div>
        <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{marginBottom: '32px'}}>Coveatをご覧いただきありがとうございます。</Text>
        <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{marginBottom: '32px'}}>Coveatは感染対策に取り組む飲食店と感染対策を求めているお客様の出会いをお手伝いするためのグルメサービスです。</Text>
        <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{marginBottom: '32px'}}>サービスはお店のかたもすべて無料でご利用いただけます。ぜひお店の登録をリクエストしませんか？</Text>
        <div className="img-container">
          <img className="icon" src='/arrow-down.png' /> 
        </div>
        <Button theme={[ButtonThemes.NORMAL]} propStyle={{margin: '0 auto'}} onClick={onClick}>登録をリクエストする</Button>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            max-width: 320px;
            margin: 32px auto;
            text-align: center;
          }

          .img-container {
            margin: 32px 0;
          }

          .img-container img.image {
            width: 100%;
            height: auto;
          }
        `}
      </style>
    </HomeLayout>
  );
}