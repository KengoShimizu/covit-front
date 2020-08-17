import React from 'react';
import { Link } from 'react-router-dom';
import HistoryIcon from './../../../img/history.svg'
import Alcohol from './../../../img/covid-icon_alcohol.svg'
import Mask from './../../../img/covid-icon_mask.svg'
import Airing from './../../../img/covid-icon_airing.svg'
import Distance from './../../../img/covid-icon_distance.svg'
import HealthCare from './../../../img/covid-icon_health-care.svg'

//レビュー記入
export const Comment: React.FC = () => {
    return (
      <div className='container'>
        <header className="header">
          <img className="service-logo" src="" alt=""/>
          <ul className="icon-list">
            <Link to='/History'>
              <li className="icon-list_option">
                <img className="icon-list_img" src={HistoryIcon} alt=""/>
                <p className="icon-list_caption">レビュー</p>
              </li>
            </Link>
            <li className="icon-list_option">
              <img className="icon-list_img" src={HistoryIcon} alt=""/>
              <p className="icon-list_caption">ログイン</p>
            </li>
            <li className="icon-list_option_menu">
              <img className="icon-list_img" src={HistoryIcon} alt=""/>
            </li>
          </ul>
        </header>
        <div className="content">
          <div className="sub-header">
            <Link to='/'>
              <div className="sub-header_btn">
                <p>←</p>
              </div>
            </Link>
            <h1 className="sub-header_title">レビュー記入</h1>
          </div>
          <h1 className="shop-name">cafe えにしえ</h1>
          <section className="infection-control_card">
            <h2 className="infection-control_title">感染症対策内容</h2>
            <ol className="infection-control_list">
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Alcohol} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Airing} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Mask} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={HealthCare} alt=""/>
              </li>
              <li className="infection-control_option">
                <img className="infection-control_icon" src={Distance} alt=""/>
              </li>
            </ol>
            <ol className="infection-control_comment-box">
              <li className="infection-control_comment">従業員がマスクを着用しています。</li>
              <li className="infection-control_comment">お客様にマスクの着用をお願いしています。</li>
            </ol>
          </section>
          <form method="post" className="review-form">
            <ul>
              <li className="review-form_switch_container">
                <ul className="review-form_switch">
                  <li className="review-form_switch-option">
                    <label className="review-form_switch-label" htmlFor="">
                      <img className="review-form_switch-labe_img" src={HistoryIcon} alt=""/>
                      <p className="review-form_switch-label_text">期待通り</p>
                    </label>
                    <input className="review-form_switch-input" type="radio" name="review" value="good"/>
                  </li>
                  <li className="review-form_switch-option">
                    <label className="review-form_switch-label" htmlFor="">
                      <img className="review-form_switch-labe_img" src={HistoryIcon} alt=""/>
                      <p className="review-form_switch-label_text">表記と違う</p>
                    </label>
                    <input className="review-form_switch-input" type="radio" name="review" value="bad"/>
                  </li>
                </ul>
              </li>
              <li className="review-form_comment_container">
                <label className="review-form_comment-label" htmlFor="">感染対策についての感想や評価を記入しよう！</label>
                <textarea className="review-form_comment-input" placeholder="換気や消毒を徹底していてよかった。" name="comment" id="comment"></textarea>
              </li>
              <li className="review-form_btn_container">
                <button className="review-form_btn" type="submit">投稿する</button>
              </li>
            </ul>
          </form>
        </div>
        <style jsx>{`
          *{
            margin:0;
            padding:0;
            border:0;
            outline:0;
            list-style:none;
          }
          a{
            text-decoration: none;
          }
          .container{
            width: 100%
          }
          // ヘッダー
          header{
            height: 56px;
            width: 100%;
            position: fixed;
            background: #FF8A1F;
            display: flex;
            justify-content: space-between;
            padding: 6px 10px;
            box-sizing: border-box;
            z-index: 100;
          }
          .icon-list{
            display: flex;
            padding: 0;
          }
          .icon-list_option{
            text-align: center;
            width: 44px;
            height: 44px;
            margin-right: 4px;
          }
          .icon-list_option_menu{
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .icon-list_img{
            width: 32px;
            height: 32px;
          }
          .icon-list_caption{
            font-size: 8px;
            line-height: 12px;
            color: white;
          }
          // 中身
          .content{
            position: relative;
            top: 56px;
            min-height: 100vh;
          }
          .sub-header{
            background: #FFFFFF;
            width: 100%;
            height: 40px;
            text-align: center;
            margin-bottom: 8px;
          }
          .sub-header_btn{
            width: 40px;
            height: 40px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sub-header_title{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #333333;
            margin: 9px auto 7px auto;
          }
          
          //カード
          .shop-name{
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
            text-align: center;
            margin-bottom: 16px;
          }
          // 感染対策
          .infection-control_card{
            padding: 16px 0;
            border-top: 2px solid #C0C0C0;
            border-bottom: 2px solid #C0C0C0;
          }
          .infection-control_title{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 8px;
            margin-left: 24px;
          }
          .infection-control_list{
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
          }
          .infection-control_option :not(:last-child) {
            margin-right: 12px;
          }
          .infection-control_option{
            width: 60px;
            height: 60px;
            border-radius: 60px;
            background: #98D4F6;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .infection-control_icon{
            width: 34px;
            height: auto;
          }
          .infection-control_comment-box{
            background: #E7E7E7;
            position: relative;
            padding: 16px 20px;
            border-radius: 8px;
            max-width: 344px;
            width: 80%;
            margin: 0 auto;
            font-weight: bold;
            font-size: 12px;
            line-height: 19px;
            color: #333333;
          }
          .infection-control_comment:not(:last-child){
            margin-bottom: 2px;
          }
          .infection-control_comment::before{
            content: '';
            position: absolute;
            left: calc(50% - 4px);
            top: -8px;
            display: block;
            width: 0;
            height: 0;
            border-right: 6px solid transparent;
            border-bottom: 8px solid #E7E7E7;
            border-left: 6px solid transparent;
          }
          
          .review-form{
            padding: 24px;
          }
          .review-form_switch_container{
            width: 100%;
            margin-bottom: 24px;
          }
          .review-form_switch{
            display: flex;
            justify-content: center;
          }
          .review-form_switch-option{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .review-form_switch-label{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .review-form_switch-label_img{
            width: 24px;
            height: 24px;
            margin-bottom: 2px;
          }
          .review-form_switch-label_text{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
          }
          .review-form_switch-option:not(:last-child){
            margin-right: 72px;
          }
          .review-form_switch-input{
            width: 24px;
            height 24px;
            background: #E7E7E7;
            margin: 14px;
          }
          .review-form_switch-input:checked {
            background: #ED753A;
          }

          .review-form_comment_container{
            margin-bottom: 24px;
          }
          .review-form_comment-label{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            display: inline-block;
            margin-bottom: 6px;
          }
          .review-form_comment-input{
            padding: 6px 10px;
            width: calc(100% - 20px);
            font-size: 16px;
            line-height: 1.7em;
            height: calc( 1.7em * 5 );
            border: 1px solid #C0C0C0;
            border-radius: 4px;
          }
          .review-form_btn_container{
            text-align: center;
          }
          .review-form_btn{
            background: #FF8A1F;
            border-radius: 4px;
            padding: 8px 32px;
            color: white;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
          }
          
        `}</style>
      </div>
    );
}