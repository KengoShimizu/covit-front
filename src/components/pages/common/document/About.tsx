import React, { useContext } from 'react';
// library
import { Link } from 'react-router-dom';
// components
import HomeLayout from '../../../templates/HomeLayout';
import CommonStyle from '../../../../common/CommonStyle';
//atom
import Text, { TextThemes } from './../../../atoms/Text';
import Button, { ButtonThemes } from './../../../atoms/Button';
import { RouteName } from '../../../../common/Const';
// context
import AuthContext from "../../../../context/CommonProvider";



const propStyle = {
  headerTitleComment: {
    fontSize: window.innerWidth > 560 ? '24px' : '18px',
  },
  headerTitle: {
    fontSize: window.innerWidth > 560 ? '24px' : '18px',
    borderBottom: '4px dotted rgb(255, 255, 255)',
    paddingBottom: '4px',
    lineHeight: '2.4em',
    display: 'initial',
    color: 'white',
  },
  headerText: {
    marginTop: '4px',
  },
  topBtn: {
    position: 'absolute',
    right: window.innerWidth > 560 ? 'auto' : '1px',
    left: window.innerWidth > 560 ? '144px' : 'auto',
    bottom: '24px',
    zIndex: '100',
    transitionDuraiton: '.5s',
    transitionTimingFunction: 'ease',
  },
  greetingText:{
    marginBottom: '16px',
  },
  greetingBtn:{
    margin: window.innerWidth > 560 ? '0 auto 160px 0' : '0 auto 160px auto',
  },
  mapBtn:{
    margin: '0 auto',
  },
  aboutComment:{
    margin: '0 auto 0 0',
    maxWidth: '18em',
  },
  aboutCommentRight:{
    margin: '0 0 0 auto',
    maxWidth: '18em',
  },
  aboutCatchCopy:{
    margin: '0 auto 64px auto',
    width: '19em',
    maxWidth: '90%',
    textAlign: 'center',
    paddingBottom: '8px',
    borderBottom: '4px dotted #DF6059',
    fontSize: window.innerWidth > 560 ? '24px' : '14px',
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
  },
  copyRightText:{
    marginBottom: '16px',
    color: 'white',
    textDecoration: 'underline',
  }
};

// LP
const Greeting: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
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
                <Text theme={[TextThemes.LPSUBTITLE]} propStyle={propStyle.headerTitleComment}>
                  口コミ
                </Text>
              </span>
              <Text theme={[TextThemes.LPSUBTITLE]} propStyle={propStyle.headerText}>
                で分かる
              </Text>
            </div>
            <Text theme={[TextThemes.LPSUBTITLE]} propStyle={propStyle.headerTitle}>感染対策をしている<br />飲食店MAP</Text>
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
          <div className="header-post_img-container">
            <p className="header-post_img-wrapper">
              <img className="header-post_img" src="/post.png" alt="" />
            </p>
            <div className="header-post_comment">
              <span className="header-post_comment-line_left"></span>
              <span className="header-post_comment-line_right"></span>
              <p className="header-post_comment-text">感染対策をしている<br/>
              お店を投稿しよう！</p>
            </div>
          </div>
          <Link to={RouteName.ROOT}>
              <Button theme={[ButtonThemes.LP]} propStyle={propStyle.topBtn}>さっそく始める</Button>
          </Link>
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
            <Link to={RouteName.ROOT}>
              <Button theme={[ButtonThemes.LP]} propStyle={propStyle.greetingBtn}>さっそくお店をさがす</Button>
            </Link>
            <p className="greeting_img_wrapper"><img className="greeting_img" src="/greeting.png" alt="" /></p>
          </div>
        </section>
        {/* map */}
        {/* <section className="map_container">
          <div className="title-container">
            <p className="title_en">map</p>
            <h2 className="title_jp">近くの感染対策をしているお店</h2>
          </div>
          <div className="map_iframe-container">
          <iframe src="https://www.coveat.work/" title="covEAT" width="100%" height="100%"/>
          </div>
          <Button theme={[ButtonThemes.LP]} propStyle={propStyle.mapBtn}>もっと見る</Button>
        </section> */}
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
              <p className="about_comment-img-wrapper_right">
                <img className="about_comment-img" src="/about_owner.png" alt="オーナーの声" />
              </p>
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.aboutCommentRight}>
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
                <div className="about_comment-wrapper_user">
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
                <div className="about_comment-wrapper_user">
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
                      <Text theme={[TextThemes.LPTEXT]}>感染対策に対するユーザーの評価とコメント</Text>
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
                <div className="about_comment-wrapper_user">
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
              <Link to={authState.user.is_owner ? RouteName.OWNER_SHOP_FORM : RouteName.REQUEST_TOP}><Button theme={[ButtonThemes.LP]} propStyle={propStyle.aboutBtn}>お店の登録はこちら</Button></Link>
            </li>
          </ul>
        </section>
        {/* features */}
        <section className="features_container">
          <div className="title-container">
            <p className="title_en">features</p>
            <h2 className="title_jp">covEATでできること</h2>
          </div>
          <ul className="features_card-container">
            <li className="features_card">
              <h3 className="features_card-title">マップからお店を見つける</h3>
              <p className="features_card-num">01</p>
              <p className="features_card-img-wrapper">
                <img className="features_card-img" src="/features1.png" alt="" />
              </p>
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.featuresText}>covEATでは地図上で感染対策をしているお店を見つけることができます。</Text>
            </li>
            <li className="features_card">
              <h3 className="features_card-title">お店の感染対策をチェック</h3>
              <p className="features_card-num_right">02</p>
              <p className="features_card-img-wrapper">
                <img className="features_card-img" src="/features2.png" alt="" />
              </p>
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.featuresText}>お店の感染対策を<br />
              マスク・消毒・ソーシャルディスタンス体調管理・換気<br />
              の項目で確認することが出来ます！</Text>
            </li>
            <li className="features_card">
              <h3 className="features_card-title">実際に行ってみたお店の感染対策をレビュー</h3>
              <p className="features_card-num">03</p>
              <p className="features_card-img-wrapper">
                <img className="features_card-img" src="/features3.png" alt="" />
              </p>
              <Text theme={[TextThemes.LPTEXT]} propStyle={propStyle.featuresText}>covEATで実際に行ってみたお店の感染対策をレビューを書くことでみんなのお店探しの手助けになります！</Text>
            </li>
          </ul>
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
          <Link to={authState.user.is_owner ? 
            RouteName.OWNER_SHOP_FORM 
            : authState.user ? 
            RouteName.USER_SHOP_FORM
            : RouteName.REGISTER
            }><Button theme={[ButtonThemes.LP]} propStyle={propStyle.postButton}>教えてあげる</Button>
          </Link>
          <p className="post_img-wrapper">
            <img className="post_img" src="/post-shop.png" alt=""/>
          </p>
        </section>
        <footer className="footer_contaienr">
          <ul className="footer_list">
            <li className="footer_option">
              <Link to={RouteName.PRIVACY}>
                <Text theme={[TextThemes.CAPTION]} propStyle={{color: CommonStyle.TextWhite}}>プライバシー ポリシー</Text>
              </Link>
            </li>
            {/* <li className="footer_option">
              <Link to={RouteName.PRIVACY}>
                <Text theme={[TextThemes.INIT]} propStyle={{color: CommonStyle.TextWhite}}>コンタクト</Text>
              </Link>
            </li> */}
            <li className="footer_option">
              <Link to={RouteName.ROOT}>
                <Text theme={[TextThemes.CAPTION]} propStyle={{color: CommonStyle.TextWhite}}>サービスページ</Text>
              </Link>
            </li>
          </ul>
          <small className="footer_copyright_other">
            <a href="http://express.heartrails.com/" target="_blank" rel="noopener noreferrer">
              <Text propStyle={propStyle.copyRightText}>&copy; HeartRails Express</Text>
            </a>
            <a href="https://www.iconfinder.com/iconsets/stop-virus-outline-iconset?utm_campaign=Virus%20awareness&utm_medium=landing%20page&utm_source=Webflow&utm_content=Stop%20virus%20by%20LAFS" target="_blank" rel="noopener noreferrer">
              <Text propStyle={propStyle.copyRightText}>Stop virus outline iconset icon set by Avatar LAFS</Text>
            </a>
          </small>
          <small className="footer_copyright">&copy; 2020 covEAT</small>
        </footer>
      </div>
      <style jsx>{`
        *{
          transition-timing-function: ease;
        }
        .header_container{
          width: 100%;
          height: auto;
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
          background: ${CommonStyle.BgWhite};
          z-index: 1;
        }
        .header_inner-container{
          background: ${CommonStyle.AccentColor};
          border-radius: 24px;
          width: calc(100% - 28px);
          max-width: 720px;
          margin: 24px auto;
          box-sizing: border-box;
          padding: 32px 30px;
          min-height: 60vh;
        }
        .header-caption_wrapper{
          font-weight: bold;
          font-size: 18px;
          line-height: 36px;
          z-index: 10;
        }
        .header_img-wrapper{
          width: 320px;
          height: auto;
          position: absolute;
          right: -60px;
          bottom: -20px;
          z-index: 5;
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
          width: 120px;
          height: 60px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
        }
        @media screen and (max-width: 370px) {
          .header_inner-container{
            min-height: 360px;
          }
          .header_img-wrapper{
            transition-timing-function: ease;
            transition-duration: .5s;
            width: 200px;
          }
          .header_circle{
            transition-timing-function: ease;
            transition-duration: .2s;
            width: 160px;
            height: 160px;
            top: -64px;
            right: -64px;
          }
          .header_caption-bubble{
            width: 96px;
            height: 40px;
          }
        }
        @media screen and (min-width: 370px) {
          .header_img-wrapper{
            transition-timing-function: ease;
            transition-duration: .5s;
            width: 280px;
            
          }
          .header_inner-container{
            min-height: 480px;
          }
          .header_circle{
            transition-timing-function: ease;
            transition-duration: .2s;
            width: 200px;
            height: 200px;
            top: -64px;
            right: -64px;
          }
        }
        @media screen and (min-width: 680px) {
          .header_inner-container{
            padding: 32px 80px;
          }
          .header_img-wrapper{
            width: 360px;
            transition-timing-function: ease;
            transition-duration: .5s;
            right: calc(50vw - 460px);
          }
          .header_caption-bubble{
            width: 120px;
            height: 80px;
          }
        }
        
        
        .main-container{
          background: ${CommonStyle.BgGray}
        }
        .header-post_container{
          position: relative;
          top: -64px;
          height: 220px;
          overflow: hidden;
          max-width: 800px;
          margin: 0 auto;
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
        .header-post_img-container{
          position: absolute;
          left: 16px;
          bottom: -16px;
          z-index: 50;
        }
        .header-post_img-wrapper{
          width: 120px;
          height: auto;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .header-post_img{
          width: 100%;
          height: auto;
        }
        .header-post_comment{
          width: 10em;
          height: auto;
          font-size: 12px;
          line-height: 1.6em;
          font-weight: bold;
          position: absolute;
          transform: rotate(6.5deg);
          left: 136px;
          bottom: 120px;
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
        @media screen and (min-width: 560px) {
          .header-post_container{
            top: -220px;
            transition-duration: .1s;
            transition-timing-function: ease;
          }
        }

        .greeting_container{
          padding: 0 24px;
          margin: 0 auto ${CommonStyle.MarginLP} auto;
          max-width: 760px;
        }
        @media screen and (min-width: 560px) {
          .greeting_container{
            margin-bottom: 120px;
          }
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
          max-width: 28em;
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
        @media screen and (min-width: 560px) {
          .greeting_container{
            margin-top: -160px;
          }
          .greeting_inner-container{
            padding: 24px 40px;
          }
        }
        @media screen and (min-width: 720px) {
          .greeting_img_wrapper{
            width: 360px;
            transition-timing-function: ease;
            transition-duration: .5s;
          }
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
          font-size: 16px;
          line-height: 1.6em;
          color: ${CommonStyle.TextBlack};
          text-align: center;
        }
        @media screen and (min-width: 720px) {
          .title-container{
            margin-bottom: 60px;
          }
          .title_en{
            font-size: 16px;
          }
          .title_jp{
            font-size: 24px;
          }
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
          margin: 0 auto 40px auto;
          max-width: 640px;
        }
        .about_comment-wrapper{
          width: 80%;
          margin: 0 auto;
        }
        .about_comment-wrapper:not(:last-child){
          margin-bottom: 40px;
        }
        .about_comment-img-wrapper{
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin-bottom: 16px;
        }
        .about_comment-img-wrapper_right{
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin: 0 0 16px auto;
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
        
        @media screen and (min-width: 560px) {
          .about{
            margin-top: -160px;
          }
          .about_comment-container{
            margin-bottom: 60px;
          }
          .about_arrow-container{
            margin-bottom: 40px;
          }
        }
        
        {/* about */}
        .about_worries-container{
          padding: 40px 8px;
          background-image: url("/about-bg.png");
          background-repeat: repeat;
          background-size: 32px;
        }
        @media screen and (min-width: 560px) {
          .about_worries-container{
            background: ${CommonStyle.KeyColor};
          }
        }
        .about_worry-card{
          max-width: 840px;
          margin: 0 auto;
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
        .about_comment-wrapper_user{
          padding: 8px 12px;
          background: ${CommonStyle.BgWhite};
          border-radius: 8px;
          display: contents;
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
        @media screen and (min-width: 560px) {
          .about_worry-card{
            padding: 40px 60px;
          } 
          .about_user-container{
            margin-bottom: 0;
          }
          .about_comment-wrapper_manager{
            padding: 16px 24px;
          }
        }

        {/* features */}
        .features_container{
          margin-bottom: ${CommonStyle.MarginLP};
        }
        @media screen and (min-width: 560px) {
          .features_container{
            margin-bottom: 120px;
          }
        }
        
        .features_card-container{
          display: flex;
          justify-content: center;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
        }
        .features_card{
          width: 80%;
          max-width: 360px;
          box-sizing: border-box;
          border-radius: 16px;
          padding: 32px 24px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
          margin-bottom: 64px;
          background: ${CommonStyle.BgWhite};
        }
        .features_card-title{
          font-size: 18px;
          line-height: 1.6em;
          font-weight: bold;
          color: ${CommonStyle.AccentColor};
          margin-bottom: 12px;
          order: 2;
        }
        .features_card-img-wrapper{
          width: 180px;
          height: auto;
          margin-bottom: 16px;
          order: 1;
        }
        .features_card-img{
          width: 100%;
          height: auto;
        }
        @import url('https://fonts.googleapis.com/css2?family=Sriracha&display=swap');
        .features_card-num{
          position: absolute;
          left: 20px;
          top: -40px;
          font-size: 72px;
          font-family: 'Sriracha', cursive;
          color: ${CommonStyle.AccentColor};
        }
        .features_card-num_right{
          position: absolute;
          right: 20px;
          top: -40px;
          font-size: 72px;
          font-family: 'Sriracha', cursive;
          color: ${CommonStyle.AccentColor};
        }
        @media screen and (min-width: 1200px) {
          .features_card-container{
            flex-direction: row;
            transition-timing-function: ease;
            transition-duration: .5s;
          }
          .features_card-num_right{
            right: auto;
            left: 20px;
          }
          .features_card{
            height: 416px;
            padding: 36px 40px;
          }
        }

        {/* post */}
        .post_container{
          position: relative;
          padding: 36px 20px 200px 20px;
          background: ${CommonStyle.BgWhite};
          margin: 0 auto;
          box-sizing: border-box;
          max-width: 720px;
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
        @media screen and (min-width: 560px) {
          .post_container{
            padding: 36px 40px 200px 40px;
          }
          .post_img-wrapper{
            max-width: 320px;
          }
        }
        @media screen and (min-width: 720px) {
          .post_container{
            border-radius: 24px;
            margin-bottom: 120px;
          }
        }

        .footer_contaienr{
          padding: 64px 40px 80px 40px;
          background: #333;
          color: ${CommonStyle.TextWhite};
          position: relative;
        }
        .footer_list{
          display: flex;
          justify-content: center;
          flex-direction: column;
          background: #333;
          font-size: ${CommonStyle.Caption};
          font-weight: bold;
          color: ${CommonStyle.TextWhite};
          max-width: 800px;
          margin: 0 auto 32px auto;
        }
        .footer_option:not(:last-child){
          margin-bottom: 8px;
        }
        .footer_copyright{
          display: block;
          text-align: center;
          font-weight: bold;
          font-size: ${CommonStyle.Text};
        }
        .footer_copyright_other{
          display: block;
          width: 90%;
          max-width: 800px;
          margin: 0 auto 40px auto;
          font-weight: bold;
          font-size: ${CommonStyle.Caption};
        }
      `}</style>
    </HomeLayout>
  );
}

export default Greeting;