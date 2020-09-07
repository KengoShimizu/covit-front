import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import CommonStyle from '../../../../common/CommonStyle';


// LP
const greeting: React.FC = (props: any) => {
  return (
    <HomeLayout headerText="LP" prevRef='#' history={props.history}>
      <header>
        <h1>covEAT</h1>
        <div className="header-container">
          <div className="header_caption-wrapper">
            <p className="header_caption">
              <span className="header_caption-img_wrapper">
                <img className="header_caption-img" src="" alt="口コミ"/>
              </span>
              で分かる
            </p>
            <p className="header_caption">感染対策をしている<br/>飲食店MAP</p>
          </div>
          <div className="header_img-wrapper">
            <img className="header_img" src="" alt=""/>
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
        <button　className="header-posr_btn">さっそくお店をさがす</button>
      </section>
      <section className="greeting_container">
        <div className="greeting_inner-container">
          <div className="greeting_sentence_container">
            <p className="greeting_sentence">長引くコロナ禍で、私たちの外食のあり方が変わってきています。</p>
            <p className="greeting_sentence">たまには外食したい。飲食店を応援したい。<br/>
            でも、感染対策がきちんとされているか不安。</p>
            <p className="greeting_sentence">そんな人が安心して外食ができるように、感染対策をしているお店だけを掲載するグルメマップを作りました。</p>
          </div>
          <button　className="greeting_btn">さっそくお店をさがす</button>
          <p className="greeting_img_wrapper"><img className="greeting_img" src="" alt=""/></p>
        </div>
      </section>
      <section className="map_container">
        <div className="map_title-container">
          <p className="map_title_en">map</p>
          <h2 className="map_title_jp">近くの感染対策をしているお店</h2>
        </div>
        <div className="map_iframe-container"></div>
        <button className="map_btn">もっと見る</button>
      </section>
      <section className="about_container">
        <div className="map_title-container">
          <p className="map_title_en">about</p>
          <h2 className="map_title_jp">covEATについて</h2>
        </div>
        <div className="about_comment-wrapper">
          <p className="about_comment">「友達とご飯を食べる約束をしたけどちゃんと感染対策をしているお店か不安…… 」</p>
          <span className="about_comment_img-wrapper_user"><img className="about_comment_img" src="" alt=""/></span>
        </div>
        <div className="about_comment-wrapper">
          <p className="about_comment">「コロナ でお客さんが減ってしまった。ちゃんと感染対策をしているんだけど伝える手段がないし困った……」</p>
          <span className="about_comment_img-wrapper_user"><img className="about_comment_img" src="" alt=""/></span>
        </div>
      </section>
      <section></section>
      <section></section>
      <section></section>
      <footer></footer>
      <style jsx>{`
        .mail-form{
          max-width: 324px;
          width: 90%;
          margin: 40px auto 0;
        }
        .list{
          background: ${CommonStyle.BgGray};
          padding: 8px;
          width: 90%;
          margin: 0 auto;
        }
        .anchor{
          align-items: flex-start;
          display: flex;
          text-decoration: none;
        }
        .icon{
          width: 40px;
          height: 40px;
          background: gray;
        }
      `}</style>
    </HomeLayout>
  );
}

export default greeting;