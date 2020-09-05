import React, { useState, useEffect, useContext } from 'react';
// library
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import useReactRouter from "use-react-router";
import { Smile, ChevronRight, Frown, Edit, Clock, Phone, MapPin, Twitter, Monitor, Facebook, Instagram, Sun, Moon } from 'react-feather';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RedirectFrom, RouteName, OwnerType } from '../../../common/Const';
// components
import HomeLayout from '../../templates/HomeLayout';
import Text, { TextThemes } from '../../atoms/Text';
import Button, { ButtonThemes } from '../../atoms/Button';
import InfectionControlList from '../../organisms/InfectionControlList';
import Loading from '../../molecules/Loading';
// context
import RedirectContext from '../../../context/RedirectContext';
import AuthContext from "../../../context/CommonProvider";

const propStyle = {
  commentBtn: {
    margin: '0 auto 0 auto'
  },
  shopedit: {
    margin: '0 auto 0 auto',
  }
};

const Shop: React.FC = (props: any) => {
  const snsTags = [
    <Twitter size={24} color="#333" />,
    <Facebook size={24} color="#333" />,
    <Instagram size={24} color="#333" />,
    <Monitor size={24} color="#333" />
  ]
  const redirectContext = useContext(RedirectContext);
  const { authState } = useContext(AuthContext);
  const { match }: any = useReactRouter();
  const [loading, setLoading] = useState(true);
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
    links: []
  });

  const fetchShopData = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/${authState.user.is_owner ? 'owner' : 'user'}/shops/${match.params.id}`);
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

  return (
    <React.Fragment>
      {loading ? <Loading /> :
        shopData.user_id && authState.user.is_owner !== OwnerType.NOT_OWNER && shopData.user_id !== authState.user.id ?
        <Redirect to='' /> :
        <HomeLayout headerText={shopData.name} prevRef={RouteName.ROOT} history={props.history}>
          <div className="content">
            <div className="shop-card">
              {/* ヘッダー画像 */}
              <section className="shop-card_section">
                <div className="shop-img_wrapper">
                  <img className="shop-img" src={shopData.image} alt="shop header" />
                </div>
                <ol className="shop_base-info">
                  <li className="shop_base-info_option">
                    <Text theme={[TextThemes.CAPTION]}>
                      {shopData.name}
                    </Text>
                  </li>
                  <li className="shop_base-info_option">
                    <ol className="shop_cost-list">
                      <li className="shop_cost-option">
                        <span className="shop_cost-icon_day">
                          <Sun size={10} color="#fff" />
                        </span>
                        <Text theme={[TextThemes.SMALL]}>
                          {shopData.price_day}円
                    </Text>
                      </li>
                      <li className="shop_cost-option">
                        <span className="shop_cost-icon_night">
                          <Moon size={10} color="#fff" />
                        </span>
                        <Text theme={[TextThemes.SMALL]}>
                          {shopData.price_night}円
                    </Text>
                      </li>
                    </ol>
                  </li>
                </ol>
              </section>
              <hr className="shop_hr" />
              {/* 感染対策情報 */}
              <section className="shop-card_section nfection-control_card">
                <h2 className="infection-control_title">感染対策</h2>
                <InfectionControlList stepData={shopData.steps} />
                {shopData.other_step &&
                  <div className="other-step">
                    <Text theme={[TextThemes.DARKGRAY, TextThemes.CAPTION]} propStyle={{marginBottom: '5px'}}>お店からのメッセージ</Text>
                    <Text theme={[TextThemes.CAPTION]}>{shopData.other_step}</Text>
                  </div>
                }
                <hr className="infection-control_hr" />
                <div className="infection-control_review">
                  <h3 className="infection-control_review-title">対策への評価</h3>
                  <ol className="infection-control_review-list">
                    <li className="infection-control_review-option">
                      <Smile size={24} color="#ED753A" />
                      <span className="infection-control_review-num">
                        {shopData.good_count}<br />
                      </span>
                    </li>
                    <li className="infection-control_review-option">
                      <Frown size={24} color="#3A8CED" />
                      <span className="infection-control_review-num">
                        {shopData.bad_count}<br />
                      </span>
                    </li>
                  </ol>
                  <Link to={`/shops/${match.params.id}/comments`}>
                    <Button theme={[ButtonThemes.SUBBTN]}>
                      コメントを見る
                  <ChevronRight size={14} color="#333" />
                    </Button>
                  </Link>
                </div>
                <hr className="infection-control_hr" />
                <Link to={`/shops/${match.params.id}/comments/new`}>
                  <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.commentBtn} onClick={() => redirectContext.setFromPath(RedirectFrom.NEW_COMMENT)}>
                    <Edit size={20} color="#fff" />
                    <span className="infection-control_comment-text">感染対策のレビューを書く</span>
                  </Button>
                </Link>
              </section>
              <hr className="shop_hr" />
              <section className="shop-card_section">
                <ul className="shop_info-list">
                  <li className="shop_info-option">
                    <Clock size={16} color="#333" />
                    <span className="shop_info-option_content">
                      {shopData.business_date}
                    </span>
                  </li>
                  <li className="shop_info-option">
                    <Phone size={16} color="#333" />
                    <span className="shop_info-option_content">
                      <a href={`tel:${shopData.contact}`}>{shopData.contact}</a>
                    </span>
                  </li>
                  <li className="shop_info-option">
                    <MapPin size={16} color="#333" />
                    <span className="shop_info-option_content">
                      <a href="javascript:;" onClick={() => {window.open('http://maps.google.co.jp/maps?q='+encodeURI(shopData.address)); return false;}}>
                        {shopData.address}
                      </a>
                    </span>
                  </li>
                </ul>
                <ul className="shop_sns-list">
                  {shopData.links.map((data: any, i: number) => (
                    <li className="shop_sns-option" key={`sns${i}`}>
                      <a href={data.url} target="_blank" rel="noopener noreferrer">
                        <Button theme={[ButtonThemes.SHOPSNS]}>
                          {snsTags[(data.url_type-1)]}
                        </Button>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
              {/* FIXME v2で実装 */}
              <div style={{ display: 'none' }}>
                <hr className="shop_hr" />
                <section className="shop-card_section">
                  <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.shopedit}>
                    情報の編集をリクエスト
                  </Button>
                </section>
              </div>
              {/* ここまで */}
            </div>
          <style jsx>{`
            .shop-card_section{
              padding: 24px 16px;
            }
            .shop_hr{
              height: 8px;
              width: 100%;
              background: ${CommonStyle.BgGray};
              margin: 0;
            }
            // 中身
            .shop-card{
            }
            .shop-img_wrapper{
              width: 240px;
              max-width: 80%;
              height: 120px;
              overflow: hidden;
              margin: 0 auto;
              margin-bottom: 32px;
              background: ${CommonStyle.BgGray}
            }
            .shop-img{
              width: 100%;
              height: auto;
            }

            // 基本情報
            .shop_base-info{
            }
            .shop_base-info_option:not(:last-child){
              margin-bottom: 8px;
              
            }
            // コスト
            .shop_cost-list{
              display: flex;
              width: fit-content;
            }
            .shop_cost-option{
              display: flex;
              align-items: center;
              margin-right: 24px;
            }
            .shop_cost-icon_day{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 16px;
              height: 16px;
              margin-right: 8px;
              border-radius: 4px;
              background: ${CommonStyle.AccentColor};
            }
            .shop_cost-icon_night{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 16px;
              height: 16px;
              margin-right: 8px;
              border-radius: 4px;
              background: ${CommonStyle.BadColor};
            }
            .shop_cost-text{
              font-weight: bold;
              font-size: 12px;
              color: ${CommonStyle.TextBlack}
            }
            // 感染対策
            .other-step{
              padding: 10px;
              border: 1px solid ${CommonStyle.BorderGray};
              border-radius: 5px;
              margin-bottom: 25px;
            }
            .infection-control_hr{
              height: 2px;
              margin: 0 0 16px 0;
              background: ${CommonStyle.BgGray}
            }
            .infection-control_card{
              margin-bottom: 16px;
            }
            .infection-control_title{
              margin-bottom: 16px;
            }
            .infection-control_list{
              display: flex;
              margin-bottom: 16px;
            }
            .infection-control_option:not(:last-child) {
              margin-right: 8px;
            }
            .infection-control_icon{
              width: 32px;
              height: auto;
            }
            .infection-control_comment{
              background-color: ${CommonStyle.BgGray};
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 16px;
              position: relative;
            }
            .infection-control_comment-option:not(:last-child){
              margin-bottom: 4px;
            }
            .infection-control_comment::before{
              content: '';
              position: absolute;
              left: 20px;
              //FIXME 選択中の対策内容によって吹き出しの位置が変わると○
              top: -8px;
              display: block;
              width: 0;
              height: 0;
              border-right:8px solid transparent;
              border-bottom: 12px solid ${CommonStyle.BgGray};
              border-left: 8px solid transparent;
            }
            .infection-control_review{
              margin-bottom: 16px;
            }
            .infection-control_review-title{
              font-weight: bold;
              font-size: 14px;
              line-height: 24px;
              color: ${CommonStyle.TextBlack};
              margin-bottom: 12px;
            }
            .infection-control_review-list{
              display: flex;
              float: left;
              margin-right: 24px;
            }
            .infection-control_review-option{
              display: flex;
              align-items: center;
            }
            .infection-control_review-option:not(:last-child){
              margin-right: 12px;
            }
            .infection-control_review-num{
              margin-left: 4px;
            }
            .infection-control_comment-text{
              margin-left: 8px;
            }

            // 基本情報
            .shop_info-list{
              margin-bottom: 16px;
            }
            .shop_info-option{
              display: flex;
              align-items: center;
              font-weight: bold;
              font-size: 12px;
              color: ${CommonStyle.TextBlack}
            }
            .shop_info-option:not(:last-child){
              margin-bottom: 16px;
            }
            .shop_info-option_content{
              margin-left: 8px;
            }
            //sns
            .shop_sns-list{
              display: flex;
              justify-content: center;
            }
            .shop_sns-option:not(:last-child){
              margin-right: 4px;
            }
          `}</style>
        </div>
      </HomeLayout>}
    </React.Fragment>
  );
}

export default Shop;