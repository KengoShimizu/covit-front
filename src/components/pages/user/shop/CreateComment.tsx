import React, { useState, useEffect } from 'react';
// library
import useReactRouter from "use-react-router";
import axios from 'axios';
import { Smile, Frown } from 'react-feather';
// common
import CommonStyle from '../../../../common/CommonStyle';
import { Comment } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import InfectionControlList from './../../../organisms/InfectionControlList';

export interface AddParam {
  content: string;
  shop_id: number;
  reputation: number;
  date: string;
}

//レビュー記入
// FIXME formに来店日追加
export const CreateComment: React.FC = (props: any) => {
  const { match }: any = useReactRouter();
  const [addData, setAddData] = useState<AddParam>({
    content: "",
    shop_id: match.params.id,
    reputation: 0,
    date: ""
  });
  const [shopData, setShopData] = useState({
    user_id: 0,
    name: '',
    address: '',
    contact: '',
    good_count: 0,
    bad_count: 0,
    image: '',
    business_date: '',
    price_day: 0,
    price_night: 0,
    other_step: '',
    steps: [{
      content: '',
      step_category: {
        image: '',
        content: ''
      }
    }],
  });

  const postData = async () => {
    await axios
      .post(`/api/v1/user/comments`, addData)
      .then(result => result.data)
      .catch(error => console.log(error));
  }

  const handleChange = (event: any) => {
    setAddData({
      ...addData,
      [event.target.name]: event.target.value
    });
  }

  const fetchShopData = () => {
    axios.get(`/api/v1/user/shops/${match.params.id}`)
    .then(res => setShopData(res.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchShopData();
  }, [])


  return (
    <HomeLayout headerText={'レビュー記入'} prevRef={`/shops/${match.params.id}`} history={props.history}>
      <div className='container'>
        <div className="content">
          <h1 className="shop-name">cafe えにしえ</h1>
          <section className="infection-control_card">
            <h2 className="infection-control_title">感染症対策内容</h2>
            <InfectionControlList stepData={shopData.steps}/>
          </section>
          <div className="review-form">
            <ul>
              <li className="review-form_switch_container">
                <ul className="review-form_switch">
                  <li className="review-form_switch-option">
                    <label className="review-form_switch-label" htmlFor="">
                      <Smile size={24} color="#ED753A"/>
                      <p className="review-form_switch-label_text">バッチリ</p>
                    </label>
                    <input className="review-form_switch-input" type="radio" name="reputation" value={Comment.REPUTATION_GOOD} onClick={handleChange} checked={addData.reputation === Comment.REPUTATION_GOOD} />
                  </li>
                  <li className="review-form_switch-option">
                    <label className="review-form_switch-label" htmlFor="">
                      <Frown size={24} color="#3A8CED"/>
                      <p className="review-form_switch-label_text">いまいち</p>
                    </label>
                    <input className="review-form_switch-input" type="radio" name="reputation" value={Comment.REPUTATION_BAD} onClick={handleChange} checked={addData.reputation === Comment.REPUTATION_BAD} />
                  </li>
                </ul>
              </li>
              <li className="review-form_comment_container">
                <label className="review-form_comment-label" htmlFor="">感染対策についての感想や評価を記入しよう！</label>
                <textarea className="review-form_comment-input" placeholder="換気や消毒を徹底していてよかった。" name="content" id="comment" onChange={handleChange} />
              </li>
              <li className="review-form_btn_container">
                <button className="review-form_btn" onClick={postData}>投稿する</button>
              </li>
            </ul>
          </div>
        </div>
        <style jsx>{`
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
            .sub-header_btn{
              width: 40px;
              height: 40px;
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
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
              border-top: 2px solid ${CommonStyle.BorderGray};
              border-bottom: 2px solid ${CommonStyle.BorderGray};
            }
            .infection-control_title{
              font-weight: bold;
              font-size: 14px;
              line-height: 24px;
              margin-bottom: 8px;
              margin-left: 24px;
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
              background: ${CommonStyle.BgGray};
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
              border: 1px solid ${CommonStyle.BorderGray};
              border-radius: 4px;
            }
            .review-form_btn_container{
              text-align: center;
            }
            .review-form_btn{
              background: ${CommonStyle.AccentColor};
              border-radius: 4px;
              padding: 8px 32px;
              color: white;
              font-weight: bold;
              font-size: 14px;
              line-height: 24px;
            }
            
          `}</style>
      </div>
    </HomeLayout>
  );
}