import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import CommonStyle from '../../../../common/CommonStyle';
//atom
import Text, { TextThemes } from './../../../atoms/Text';
import Button, { ButtonThemes } from './../../../atoms/Button';

const propStyle = {
  headerText: {
    marginTop: '4px',
  }
};

// LP
const greeting: React.FC = (props: any) => {
  return (
    <HomeLayout headerText="LP" prevRef='#' history={props.history}>
      {/* header */}
      <header className="header_container">
        {/* <h1>covEAT</h1> */}
        <div className="header_inner-container">
          <div className="header_circle"></div>
          <div className="header_caption-container">
            <div className="header-caption-wrapper">
            	<span className="header_caption-bubble">
                <Text theme={[TextThemes.LPSUBTITLE]}>
                  口コミ
                </Text>
            	</span>
            	<Text theme={[TextThemes.LPSUBTITLE]} propStyle={propStyle.headerText}>
            	  で分かる
            	</Text>
            </div>
            <Text theme={[TextThemes.LPSUBTITLE]}>感染対策をしている<br/>飲食店MAP</Text>
          </div>
          <div className="header_img-wrapper">
            <img className="header_img" src="/header-img.png" alt=""/>
          </div>
        </div>
      </header>
      <section className="header-post_container">
        <p className="heder-post_img-wrapper"><img className="heder-post_img" src="" alt=""/></p>
        <Link to="">
          <p className="heder-post_comment-img_wrapper">
            <img className="heder-post_comment-img" src="" alt=""/>
          </p>
        </Link>
        <p className="heder-post_comment">感染対策をしているお店を投稿しよう！</p>
        <Button theme={[ButtonThemes.LP]}>さっそくお店をさがす</Button>
      </section>
      {/* greeting */}
      <section className="greeting_container">
        <div className="greeting_inner-container">
          <div className="greeting_sentence_container">
            <Text theme={[TextThemes.LPSUBTITLE]}>長引くコロナ禍で、私たちの外食のあり方が変わってきています。</Text>
            <Text theme={[TextThemes.LPSUBTITLE]}>たまには外食したい。飲食店を応援したい。<br/>
            でも、感染対策がきちんとされているか不安。</Text>
            <Text theme={[TextThemes.LPSUBTITLE]}>そんな人が安心して外食ができるように、感染対策をしているお店だけを掲載するグルメマップを作りました。</Text>
          </div>
          <Button theme={[ButtonThemes.LP]}>さっそくお店をさがす</Button>
          <p className="greeting_img_wrapper"><img className="greeting_img" src="" alt=""/></p>
        </div>
      </section>
      {/* map */}
      <section className="map_container">
        <div className="map_title-container">
          <p className="title_en">map</p>
          <h2 className="title_jp">近くの感染対策をしているお店</h2>
        </div>
        <div className="map_iframe-container"></div>
        <Button theme={[ButtonThemes.LP]}>もっと見る</Button>
      </section>
      {/* about */}
      <section className="about_container">
        <div className="abouttitle-container">
          <p className="title_en">about</p>
          <h2 className="title_jp">covEATについて</h2>
        </div>
        <div className="about_comment-wrapper">
          <p className="about_comment">「友達とご飯を食べる約束をしたけどちゃんと感染対策をしているお店か不安…… 」</p>
          <span className="about_comment_img-wrapper_user"><img className="about_comment_img" src="" alt=""/></span>
        </div>
        <div className="about_comment-wrapper">
          <p className="about_comment">「コロナ でお客さんが減ってしまった。ちゃんと感染対策をしているんだけど伝える手段がないし困った……」</p>
          <span className="about_comment_img-wrapper_user"><img className="about_comment_img" src="" alt=""/></span>
        </div>
        <div className="about_arrow-img-wrapper">
          <img className="about_arrow-img" src="" alt=""/>
        </div>
        <p className="about_catch-copy-wrapper">covEATはそんなお悩みを解決するための感染対策飲食店MAPです</p>
        {/* お悩みリスト */}
        <ul className="about_worries-container">
          {/* お悩みカード1 */}
          <li className="about_worry-card">
            {/* ユーザー側 */}
            <div className="about_user-container">
              <p className="about_icon-img-wrapper_user"><img className="about_icon-img" src="" alt=""/></p>
              <div className="about_comment-wrapper_user">
                <p className="about_comment">感染対策をしているお店が知りたい！</p>
              </div>
            </div>
            {/* 運営側 */}
            <div className="about_user-container">
              <p className="about_icon-img-wrapper_manager"><img className="about_icon-img" src="" alt=""/></p>
              <div className="about_comment-wrapper_manager">
                <p className="about_comment">covEATに登録されているお店は</p>
                <ul className="about_comment-list">
                  <li className="about_comment-option">ユーザーから「感染対策をしている」と紹介されたお店</li>
                  <li className="about_comment-option">お店のオーナーから「感染対策をしている」と申請があったお店</li>
                  <li className="about_comment-option">運営が見つけた感染対策をしているお店</li>
                </ul>
                <p className="about_comment">なので、<span className="abou_comment_point">感染対策をしているお店だけから行きたいお店を見つけ</span>ることができます！</p>
              </div>
            </div>
          </li>
          {/* お悩みカード2 */}
          <li className="about_worry-card">
            {/* ユーザー側 */}
            <div className="about_user-container">
              <p className="about_icon-img-wrapper_user"><img className="about_icon-img" src="" alt=""/></p>
              <div className="about_comment-wrapper_user">
                <p className="about_comment">でもお店の自己申告だと嘘がつけちゃわない？</p>
              </div>
            </div>
            {/* 運営側 */}
            <div className="about_user-container">
              <p className="about_icon-img-wrapper_manager"><img className="about_icon-img" src="" alt=""/></p>
              <div className="about_comment-wrapper_manager">
                <p className="about_comment">そこでcovEATではユーザーがお店の感染対策を評価できるようになっています！</p>
                <ul className="about_comment-list">
                  <li className="about_comment-option">感染対策に対するユーザーの2段階評価</li>
                  <li className="about_comment-option">感染対策へのコメント</li>
                </ul>
                <p className="about_comment">を見ることができるので安心してご利用いただけます！</p>
              </div>
            </div>
          </li>
          <li className="about_worry-hr"></li>
          {/* お悩みカード3 */}
          <li className="about_worry-card">
            {/* ユーザー側 */}
            <div className="about_user-container">
              <p className="about_icon-img-wrapper_user"><img className="about_icon-img" src="" alt=""/></p>
              <div className="about_comment-wrapper_user">
                <p className="about_comment">ちゃんと感染対策をしていることを伝えてお客さんにお店にきて欲しい！</p>
              </div>
            </div>
            {/* 運営側 */}
            <div className="about_user-container">
              <p className="about_icon-img-wrapper_manager"><img className="about_icon-img" src="" alt=""/></p>
              <div className="about_comment-wrapper_manager">
                <p className="about_comment">お店のオーナー様がcovEATに登録していただくと以下のことができます！</p>
                <ul className="about_comment-list">
                  <li className="about_comment-option">お店が行っている感染対策の内容を登録できる</li>
                  <li className="about_comment-option">お店の営業時間やSNSのリンクなどを掲載できる</li>
                </ul>
                <p className="about_comment">これによって、covEATで感染対策をしているお店として見つけてもらうことができます！</p>
              </div>
            </div>
            <button>お店の登録はこちら</button>
          </li>
        </ul>
      </section>
      {/* features */}
      <section className="features_container">
        <div className="features_title-container">
          <p className="title_en">features</p>
          <h2 className="title_jp">covEATでできること</h2>
        </div>
        <section className="features_card">
          <h3 className="features_card-title">マップからお店を見つける</h3>
          <div className="features_card-img-container">
            <p className="features_card-num">01</p>
            <span className="features_card-img-wrapper"><img className="features_card-img" src="" alt=""/></span>
          </div>
          <p className="features_card_sentence">covEATでは地図上で感染対策をしているお店を見つけることができます。</p>
        </section>
        <section className="features_card">
          <h3 className="features_card-title">お店の感染対策をチェック</h3>
          <div className="features_card-img-container">
            <p className="features_card-num">02</p>
            <span className="features_card-img-wrapper"><img className="features_card-img" src="" alt=""/></span>
          </div>
          <p className="features_card_sentence">お店の感染対策を<br/>
          マスク・消毒・ソーシャルディスタンス体調管理・換気<br/>
          の項目で確認することが出来ます！</p>
        </section>
        <section className="features_card">
          <h3 className="features_card-title">実際に行ってみたお店の感染対策をレビュー</h3>
          <div className="features_card-img-container">
            <p className="features_card-num">03</p>
            <span className="features_card-img-wrapper"><img className="features_card-img" src="" alt=""/></span>
          </div>
          <p className="features_card_sentence">covEATで実際に行ってみたお店の感染対策をレビューを書くことでみんなのお店探しの手助けになります！</p>
        </section>
      </section>
      {/* post */}
      <section className="post_container">
        <div className="post_inner-container">
          <div className="post_title-container">
            <p className="title_en">post</p>
            <h2 className="title_jp">感染対策をしているお店を投稿して応援しませんか？</h2>
          </div>
          <p className="post_sentence">covEATは立ち上げたばかりのサービスなので、まだまだお店の数が少ないです。<br/>
          よければあなたが行ったことのある感染対策をしているお店を教えてください！</p>
          <button className="post_btn">教えてあげる</button>
        </div>
      </section>
      <footer className="footer-contaienr">
        <ul  className="footer-list">
          <li className="footer-option">プライバシー ポリシー</li>
          <li className="footer-option">コンタクト</li>
          <li className="footer-option">サービスページ</li>
        </ul>
        <small>＆copy; 2020 covEAT</small>
      </footer>
      <style jsx>{`
        main{
          background: ${CommonStyle.BgGray}
        }
        .header_container{
          width: 100%;
          height： auto;
          position: relative;
        }
        .header_circle{
          width: 220px;
          height: 220px;
          border-radius: 220px;
          position: absolute;
          top: -96px;
          right: -72px;
          background: ${CommonStyle.BgWhite}
        }
        .header_inner-container{
          background: ${CommonStyle.AccentColor};
          border-radius: 24px;
          margin: 24px 14px;
          padding: 32px 30px;
          min-height: 60vh;
        }
        .header-caption_wrapper{
          font-weight: bold;
          font-size: 18px;
          line-height: 36px;
        }
        .header_img-wrapper{
          width: 320px;
          height: auto;
          position: absolute;
          right: -60px;
          bottom: -20px;
        }
        .header_img{
          width: 100%;
          height： auto;
        }
        .header-caption-wrapper{
          display: flex;
          margin-bottom: 12px;
          align-items: center;
          
        }
        .header_caption-bubble{
          background-image: url("/header-bubble.svg"); 
          background-size: contain;
          bckground-position: center;
          background-repeat: no-repeat;
          width: 96px;
          height: 48px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
        }

      `}</style>
    </HomeLayout>
  );
}

export default greeting;