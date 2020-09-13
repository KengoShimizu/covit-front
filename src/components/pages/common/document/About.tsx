import React from 'react';
// library
import { Link } from 'react-router-dom';
// components
import HomeLayout from '../../../templates/HomeLayout';
import CommonStyle from '../../../../common/CommonStyle';
//atom
import Text, { TextThemes } from './../../../atoms/Text';
import Button, { ButtonThemes } from './../../../atoms/Button';
//font


const propStyle = {
  headerText: {
    marginTop: '4px',
  },
  topBtn: {
    position: 'absolute',
    right: '16px',
    bottom: '24px',
    zIndex: '100',
  },
  greetingText:{
    marginBottom: '16px',
  },
  greetingBtn:{
    margin: '0 auto 160px auto',
  },
  mapBtn:{
    margin: '0 auto',
  },
  aboutComment:{
    margin: '0 auto 16px auto',
    maxWidth: '18em',
  },
  aboutCatchCopy:{
    margin: '0 auto 64px auto',
    maxWidth: '344px',
    textAlign: 'center',
    paddingBottom: '8px',
    borderBottom: '4px dotted #DF6059',
  },
  worryComment:{
    background: '#FFFFFF',
    borderRadius: '8px',
    padding: '8px 12px',
    display: 'inline-block',
  },
  answerComment:{
    marginBottom: '8px',
  },
  aboutBtn:{
    margin: '24px auto 0 auto',
  },
  featuresText:{
    maxWidth: '20em',
    order: '3',
  },
  postText:{
    marginBottom: '32px',
  },
  postButton:{
    margin: '0 auto',
  }
};

// LP
const greeting: React.FC = (props: any) => {
  
  return (
    <HomeLayout headerText="" prevRef='#' history={props.history}>
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
              <Text theme={[TextThemes.LPSUBTITLE]}>感染対策をしている<br />飲食店MAP</Text>
            </div>
            <div className="header_img-wrapper">
              <img className="header_img" src="/header-img.png" alt="" />
            </div>
          </div>
        </header>
      <div className="main-container">
        <section className="header-post_container">
          <p className="header-post_bg-wrapper">
            <img className="header-post_bg-img" src="/top-blobs.svg" alt="" />
          </p>
          <p className="header-post_img-wrapper">
            <img className="header-post_img" src="/post.png" alt="" />
          </p>
          <Link to="">
            <p className="header-post_comment-img_wrapper">
              <img className="header-post_comment-img" src="" alt="" />
            </p>
          </Link>
          <div className="header-post_comment">
            <span className="header-post_comment-line_left"></span>
            <span className="header-post_comment-line_right"></span>
            <p className="header-post_comment-text">感染対策をしている<br/>
            お店を投稿しよう！</p>
          </div>
          
          <Button theme={[ButtonThemes.LP]} propStyle={propStyle.topBtn}>さっそくお店をさがす</Button>
        </section>
        {/* greeting */}
        <section className="greeting_container">
          <div className="greeting_inner-container">
            <div className="greeting_sentence_container">
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.greetingText}>長引くコロナ禍で、私たちの外食のあり方が変わってきています。</Text>
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.greetingText}>たまには外食したい。飲食店を応援したい。<br />
              でも、感染対策がきちんとされているか不安。</Text>
              <Text theme={[TextThemes.LPTEXT]}>そんな人が安心して外食ができるように、感染対策をしているお店だけを掲載するグルメマップを作りました。</Text>
            </div>
            <Button theme={[ButtonThemes.LP]} propStyle={propStyle.greetingBtn}>さっそくお店をさがす</Button>
            <p className="greeting_img_wrapper"><img className="greeting_img" src="/greeting.png" alt="" /></p>
          </div>
        </section>
        {/* map */}
        <section className="map_container">
          <div className="title-container">
            <p className="title_en">map</p>
            <h2 className="title_jp">近くの感染対策をしているお店</h2>
          </div>
          <div className="map_iframe-container"></div>
          <Button theme={[ButtonThemes.LP]} propStyle={propStyle.mapBtn}>もっと見る</Button>
        </section>
        {/* about */}
        <section className="about_container">
          <div className="title-container">
            <p className="title_en">about</p>
            <h2 className="title_jp">covEATについて</h2>
          </div>
          <ul className="about_comment-container">
            <li className="about_comment-wrapper">
              <p className="about_comment-img-wrapper">
                <img className="about_comment-img" src="/about_user.png" alt="ユーザーの声" />
              </p>
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.aboutComment}>
                友達とご飯を食べる約束をしたけどちゃんと感染対策をしているお店か不安…… 
              </Text>
            </li>
            <li className="about_comment-wrapper">
              <p className="about_comment-img-wrapper">
                <img className="about_comment-img" src="/about_owner.png" alt="オーナーの声" />
              </p>
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.aboutComment}>
                コロナ でお客さんが減ってしまった。ちゃんと感染対策をしているんだけど伝える手段がないし困った……
              </Text>
            </li>
          </ul>
          <div className="about_arrow-container">
            <span className="about_arrow"></span>
            <span className="about_arrow"></span>
          </div>
          <Text theme={[TextThemes.LPSUBTITLEACCENT]} propStyle={propStyle.aboutCatchCopy}>covEATはそんなお悩みを解決するための<br/>
          感染対策飲食店MAPです</Text>
          {/* お悩みリスト */}
          <ul className="about_worries-container">
            {/* お悩みカード1 */}
            <li className="about_worry-card">
              {/* ユーザー側 */}
              <div className="about_user-container">
                <p className="about_icon-img-wrapper_user"><img className="about_icon-img" src="/about_user.png" alt="" /></p>
                <div className="about_comment-wrapper">
                  <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.worryComment}>感染対策をしているお店が知りたい！</Text>
                </div>
              </div>
              {/* 運営側 */}
              <div className="about_manager-container">
                <p className="about_icon-img-wrapper_manager"><img className="about_icon-img" src="/about_manager.png" alt="" /></p>
                <div className="about_comment-wrapper_manager">
                  <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.answerComment}>covEATに登録されているお店は</Text>
                  <ul className="about_comment-list">
                    <li className="about_comment-option">
                    <Text theme={[TextThemes.LPTEXT]}>ユーザーから「感染対策をしている」と紹介されたお店</Text></li>
                    <li className="about_comment-option">
                    <Text theme={[TextThemes.LPTEXT]}>お店のオーナーから「感染対策をしている」と申請があったお店</Text></li>
                    <li className="about_comment-option">
                    <Text theme={[TextThemes.LPTEXT]}>運営が見つけた感染対策をしているお店</Text></li>
                  </ul>
                  <Text theme={[TextThemes.LPTEXT]}>なので、<span className="abou_comment_point">感染対策をしているお店だけから行きたいお店を見つけ</span>ることができます！</Text>
                </div>
              </div>
            </li>
            {/* お悩みカード2 */}
            <li className="about_worry-card">
              {/* ユーザー側 */}
              <div className="about_user-container">
                <p className="about_icon-img-wrapper_user"><img className="about_icon-img" src="/about_user.png" alt="" /></p>
                <div className="about_comment-wrapper">
                  <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.worryComment}>
                    でもお店の自己申告だと嘘がつけちゃわない？
                  </Text>
                </div>
              </div>
              {/* 運営側 */}
              <div className="about_manager-container">
                <p className="about_icon-img-wrapper_manager"><img className="about_icon-img" src="/about_manager.png" alt="" /></p>
                <div className="about_comment-wrapper_manager">
                  <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.answerComment}>そこでcovEATではユーザーがお店の感染対策を評価できるようになっています！</Text>
                  <ul className="about_comment-list">
                    <li className="about_comment-option">
                      <Text theme={[TextThemes.LPTEXT]}>感染対策に対するユーザーの2段階評価</Text>
                    </li>
                    <li className="about_comment-option">
                      <Text theme={[TextThemes.LPTEXT]}>感染対策へのコメント</Text>
                    </li>
                  </ul>
                  <Text theme={[TextThemes.LPTEXT]}>
                    を見ることができるので安心してご利用いただけます！
                  </Text>
                </div>
              </div>
            </li>
            <li className="about_worry-hr"></li>
            {/* お悩みカード3 */}
            <li className="about_worry-card">
              {/* ユーザー側 */}
              <div className="about_user-container">
                <p className="about_icon-img-wrapper_owner"><img className="about_icon-img" src="/about_owner.png" alt="" /></p>
                <div className="about_comment-wrapper">
                <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.worryComment}>ちゃんと感染対策をしていることを伝えてお客さんにお店にきて欲しい！</Text>
                </div>
              </div>
              {/* 運営側 */}
              <div className="about_manager-container">
                <p className="about_icon-img-wrapper_manager"><img className="about_icon-img" src="/about_manager.png" alt="" /></p>
                <div className="about_comment-wrapper_manager">
                  <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.answerComment}>お店のオーナー様がcovEATに登録していただくと以下のことができます！</Text>
                  <ul className="about_comment-list">
                    <li className="about_comment-option">
                    <Text theme={[TextThemes.LPTEXT]}>お店に公式マークがつく</Text></li>
                    <li className="about_comment-option">
                    <Text theme={[TextThemes.LPTEXT]}>お店が行っている感染対策の内容を登録できる</Text></li>
                    <li className="about_comment-option">
                    <Text theme={[TextThemes.LPTEXT]}>お店の営業時間やSNSのリンクなどを掲載できる</Text></li>
                  </ul>
                  <Text theme={[TextThemes.LPTEXT]}>これによって、covEATで感染対策をしているお店として見つけてもらうことができます！</Text>
                </div>
              </div>
              <Button theme={[ButtonThemes.LP]} propStyle={propStyle.aboutBtn}>お店の登録はこちら</Button>
            </li>
          </ul>
        </section>
        {/* features */}
        <section className="features_container">
          <div className="title-container">
            <p className="title_en">features</p>
            <h2 className="title_jp">covEATでできること</h2>
          </div>
          <section className="features_card">
            <h3 className="features_card-title">マップからお店を見つける</h3>
            <div className="features_card-img-container">
              <p className="features_card-num">01</p>
              <span className="features_card-img-wrapper"><img className="features_card-img" src="" alt="" /></span>
            </div>
            <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.featuresText}>covEATでは地図上で感染対策をしているお店を見つけることができます。</Text>
          </section>
          <section className="features_card">
            <h3 className="features_card-title">お店の感染対策をチェック</h3>
            <div className="features_card-img-container">
              <p className="features_card-num">02</p>
              <span className="features_card-img-wrapper"><img className="features_card-img" src="" alt="" /></span>
            </div>
            <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.featuresText}>お店の感染対策を<br />
            マスク・消毒・ソーシャルディスタンス体調管理・換気<br />
            の項目で確認することが出来ます！</Text>
          </section>
          <section className="features_card">
            <h3 className="features_card-title">実際に行ってみたお店の感染対策をレビュー</h3>
            <div className="features_card-img-container">
              <p className="features_card-num">03</p>
              <span className="features_card-img-wrapper"><img className="features_card-img" src="" alt="" /></span>
            </div>
            <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.featuresText}>covEATで実際に行ってみたお店の感染対策をレビューを書くことでみんなのお店探しの手助けになります！</Text>
          </section>
        </section>
        {/* post */}
        <section className="post_container">
          <div className="title-container">
            <p className="title_en">post</p>
            <h2 className="title_jp">感染対策をしているお店を投稿して<br/>
            お店を応援しませんか？</h2>
          </div>
          <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.postText}>covEATは立ち上げたばかりのサービスなので、まだまだお店の数が少ないです。<br/>
          よければあなたが行ったことのある感染対策をしているお店を教えてください！</Text>
          <Button theme={[ButtonThemes.LP]} propStyle={propStyle.postButton}>教えてあげる</Button>
          <p className="post_img-wrapper">
            <img className="post_img" src="/post-shop.png" alt=""/>
          </p>
        </section>
        <footer className="footer_contaienr">
          <ul className="footer_list">
            <li className="footer_option">プライバシー ポリシー</li>
            <li className="footer_option">コンタクト</li>
            <li className="footer_option">サービスページ</li>
          </ul>
          <small className="footer_copyright">&copy; 2020 covEAT</small>
        </footer>
      </div>
      <style jsx>{`
        .header_container{
          width: 100%;
          height： auto;
          position: relative;
          overflow: hidden;
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
          background-position: center;
          background-repeat: no-repeat;
          width: 96px;
          height: 48px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
        }
        .main-container{
          background: ${CommonStyle.BgGray}
        }
        .header-post_container{
          position: relative;
          top: -64px;
          height: 220px;
          overflow: hidden;
        }
        .header-post_bg-wrapper{
          position: absolute;
          width: 400px;
          height: auto;
          opacity: 1;
          left: -64px;
          top: 0;
          z-index: 10;
        }
        .header-post_bg-img{
          width: 100%;
          height: auto;
        }
        .header-post_img-wrapper{
          width: 120px;
          height: auto;
          position: absolute;
          left: 16px;
          bottom: -16px;
          z-index: 50;
        }
        .header-post_img{
          width: 100%;
          height: auto;
        }
        .header-post_comment{
          width: 100%;
          height: auto;
          font-size: 12px;
          line-height: 1.6em;
          font-weight: bold;
          position: absolute;
          transform: rotate(6.5deg);
          left: 144px;
          top: 88px;
          z-index: 100;
        }
        .header-post_comment-line_left{
          position: absolute;
          height: 2px;
          width: 40px;
          transform: rotate(-108deg);
          top: 16px;
          left: -32px;
          background: ${CommonStyle.TextBlack};
        }
        .header-post_comment-line_right{
          position: absolute;
          height: 2px;
          width: 48px;
          transform: rotate(160deg);
          top: 36px;
          left: 88px;
          background: ${CommonStyle.TextBlack};
        }

        .greeting_container{
          padding: 0 24px;
          margin-bottom: ${CommonStyle.MarginLP};
        }
        .greeting_inner-container{
          background: #FFFFFF;
          border: 2px solid #333333;
          border-radius: 8px;
          padding: 24px 16px;
          position: relative;
        }
        .greeting_sentence_container{
          margin-bottom: 24px;
        }
        .greeting_img_wrapper{
          width: 240px;
          height: auto;
          overflow: hidden;
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .greeting_img{
          width: 100%;
          height: auto;
        }

        {/* セクション共通 */}
        .title-container{
          margin-bottom: 40px;
        }
        .title_en{
          font-family: Century, sans-selif;
          font-weight: bold;
          font-size: 14px;
          color: ${CommonStyle.AccentColor};
          margin-bottom: 8px;
          text-align: center;
        }
        .title_jp{
          font-weight: bold;
          font-size: 18px;
          line-height: 1.6em;
          color: ${CommonStyle.TextBlack};
          text-align: center;
        }

        {/* map */}
        .map_container{
          margin-bottom: ${CommonStyle.MarginLP};
        }
        .map_iframe-container{
          width: 80%;
          margin: 0 auto;
          height: 60vh;
          background: ${CommonStyle.BgGray};
          border: 4px solid ${CommonStyle.AccentColor};
          margin-bottom: 24px;
        }

        {/* about */}
        .about_container{
          margin-bottom: ${CommonStyle.MarginLP};
        }
        .about_comment-container{
          margin-bottom: 40px;
        }
        .about_comment-wrapper:not(:last-child){
          margin-bottom: 40px;
        }
        .about_comment-img-wrapper{
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin: 0 auto 20px auto;
        }
        .about_comment-img{
          width: 100%;
          height: auto;
        }
        .about_arrow-container{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }
        .about_arrow{
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 18px 12px 0 12px;
          border-color: ${CommonStyle.AccentColor} transparent transparent transparent;
          line-height: 0px;
          _border-color: ${CommonStyle.AccentColor} #000000 #000000 #000000;
          _filter: progid:DXImageTransform.Microsoft.Chroma(color='${CommonStyle.AccentColor}');
          margin-bottom: 16px;
        }
        
        {/* about */}
        .about_worries-container{
          padding: 40px 8px;
          background-image: url("/about-bg.png");
          background-repeat: repeat;
          background-size: 32px;
        }
        .about_worry-card{
          background: ${CommonStyle.BgGray};
          border: 4px solid ${CommonStyle.BgWhite};
          box-sizing: border-box;
          border-radius: 16px;
          padding: 40px 14px;
        }
        .about_worry-card:not(:last-child){
          margin-bottom: 32px;
        }
        .about_user-container{
          text-align: left;
          margin-bottom: 40px;
        }
        .about_manager-container{
        }
        .about_icon-img-wrapper_user{
          width: 120px;
          height: 120px;
          border-radius: 120px;
          margin:  0 auto 8px 0;
        }
        .about_icon-img-wrapper_owner{
          width: 120px;
          height: 120px;
          border-radius: 120px;
          margin:  0 auto 8px 0;
          transform: scale(-1, 1);
        }
        .about_icon-img-wrapper_manager{
          width: 120px;
          height: 120px;
          border-radius: 120px;
          margin:  0 0 8px auto;
        }
        .about_icon-img{
          width: 100%;
          height: auto;
        }
        .about_comment-wrapper_manager{
          padding: 8px 12px;
          background: ${CommonStyle.BgWhite};
          border-radius: 8px;
          
        }
        .about_comment-option{
          margin-left: 20px;
          position: relative;

        }
        .about_comment-option::before{
          content: "";
          position: absolute;
          margin-top: 6px;
          left: -16px;
          background: ${CommonStyle.AccentColor};
          width: 12px;
          height: 12px;
          border-radius: 12px;
        }
        .about_comment-option:not(:last-child){
          margin-bottom: 6px;
        }
        .about_comment-list{
          margin-bottom: 8px;
        }

        {/* features */}
        .features_container{
          margin-bottom: ${CommonStyle.MarginLP};
        }
        .features_card{
          width: 80%;
          max-width: 260px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
          margin-bottom: 64px;
        }
        .features_card-title{
          font-size: 18px;
          line-height: 1.6em;
          font-weight: bold;
          color: ${CommonStyle.AccentColor};
          margin-bottom: 12px;
          order: 2;
        }
        @import url('https://fonts.googleapis.com/css2?family=Sriracha&display=swap');
        .features_card-num{
          position: absolute;
          left: 0;
          top: 0;
          font-size: 72px;
          font-family: 'Sriracha', cursive;
          color: ${CommonStyle.AccentColor};
        }
        .features_card-img-container{
          width: 200px;
          height: 200px;
          border-radius: 50%;
          margin: 0 auto 24px auto;
          background: ${CommonStyle.BgWhite};
          display: flex;
          justify-content: center;
          align-items: center;
          order: 1;
        }

        {/* post */}
        .post_container{
          position: relative;
          padding: 36px 40px 200px 40px;
          background: ${CommonStyle.BgWhite};
        }
        .post_img-wrapper{
          width: 70%;
          height: auto;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .post_img{
          width: 100%;
          height: auto;
        }

        .footer_contaienr{
          padding: 64px 40px 80px 40px;
          background: #333;
          color: ${CommonStyle.TextWhite};
        }

        .footer_list{
          display: flex;
          justify-content: center;
          flex-direction: column;
          background: #333;
          font-size: ${CommonStyle.Caption};
          font-weight: bold;
          color: ${CommonStyle.TextWhite};
          margin-bottom: 32px;
        }
        .footer_option:not(:last-child){
          margin-bottom: 8px;
        }
        .footer_copyright{
          display: block;
          text-align: center;
          font-weight: bold;
          font-size: ${CommonStyle.Caption};
        }
return
      `}</style>
    </HomeLayout>
  );
}

export default greeting;