import React, { useState, useEffect, useContext } from 'react';
// library
import useReactRouter from "use-react-router";
import axios from 'axios';
import { Smile, Frown } from 'react-feather';
// common
import CommonStyle from '../../../common/CommonStyle';
import { Comment, RouteName, VisitMonthArray } from '../../../common/Const';
import Validate from '../../../common/Validate';
// components
import HomeLayout from '../../templates/HomeLayout';
import InfectionControlList from '../../organisms/InfectionControlList';
import Loading from '../../molecules/Loading';
import Button, { ButtonThemes } from '../../atoms/Button';
import Select from './../../atoms/Select'
// context
import TopModalContext from '../../../context/TopModalContext';

const propStyle = {
  formBtn: {
    margin: '0 auto',
    padding: '8px 40px',
  }
}

interface AddParam {
  content: string;
  shop_id: number;
  reputation: number;
  date: string;
}

// レビュー記入
const CreateComment: React.FC = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [isOK, setIsOK] = useState(false);
  const topModalContext = useContext(TopModalContext);
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
    try{
      await axios.post(`/api/v1/user/comments`, {
          ...addData,
          date: new Date(parseInt(addData.date.substr(0,4)), parseInt(addData.date.substr(5,2))-1)
        })
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'レビューを投稿しました！',
          small: 'いつもご利用ありがとうございます。'
        }
      });
      props.history.push(RouteName.ROOT);
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: any) => {
    setAddData({
      ...addData,
      [event.target.name]: event.target.value
    });
  }

  const fetchShopData = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/user/shops/${match.params.id}`);
      if (isSubscribed) setShopData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    fetchShopData(isSubscribed);
    setLoading(false);
    const cleanup = () => {
      isSubscribed = false;
    };
    return cleanup;
  }, [])

  useEffect(() => {
    if(Validate.formValidate('comment', addData)) setIsOK(false);
    else setIsOK(true);
  }, [addData])

  return (
    <HomeLayout headerText={'レビュー記入'} prevRef={`/shops/${match.params.id}`} history={props.history}>
      {loading ? <Loading/> :
        <div className='container'>
          <div className="content">
            <h1 className="shop-name">cafe えにしえ</h1>
            <section className="infection-control_card">
              <h2 className="infection-control_title">感染症対策内容</h2>
              <InfectionControlList stepData={shopData.steps} />
            </section>
            <div className="review-form">
              <ul>
                <li className="review-form_switch_container">
                  <ul className="review-form_switch">
                    <li className="review-form_switch-option">
                      <label className="review-form_switch-label" htmlFor="">
                        <Smile size={24} color="#ED753A" />
                        <p className="review-form_switch-label_text">バッチリ</p>
                      </label>
                      <input className="review-form_switch-input" type="radio" name="reputation" value={Comment.REPUTATION_GOOD} onClick={handleChange} checked={addData.reputation == Comment.REPUTATION_GOOD} />
                    </li>
                    <li className="review-form_switch-option">
                      <label className="review-form_switch-label" htmlFor="">
                        <Frown size={24} color="#3A8CED" />
                        <p className="review-form_switch-label_text">いまいち</p>
                      </label>
                      <input className="review-form_switch-input" type="radio" name="reputation" value={Comment.REPUTATION_BAD} onClick={handleChange} checked={addData.reputation == Comment.REPUTATION_BAD} />
                    </li>
                  </ul>
                </li>
                <li className="review-form_selector_container">
                  <Select handleChange={handleChange} label='来店月を選択してください' defaultLabel={'来店月を選択してください'} defaultValue={0} items={VisitMonthArray} name={'date'} labelColor={{color: CommonStyle.TextBlack}}/>
                </li>
                <li className="review-form_comment_container">
                  <label className="review-form_comment-label" htmlFor="">感染対策についての感想や評価を記入しよう！</label>
                  <textarea className="review-form_comment-input" placeholder="換気や消毒を徹底していてよかった。" name="content" id="comment" onChange={handleChange} />
                </li>
                <li className="review-form_btn_container">
                  <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={propStyle.formBtn} onClick={isOK ? postData : () => {}}>
                    投稿する
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>}
      <style jsx>{`
          .shop-name{
            padding-top: 16px;
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
            border-top: 8px solid ${CommonStyle.BgGray};
            border-bottom: 8px solid ${CommonStyle.BgGray};
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
        `}</style>
    </HomeLayout>
  );
}

export default CreateComment;