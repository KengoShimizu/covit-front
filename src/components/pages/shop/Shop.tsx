import React, { useState, useEffect, useContext } from 'react';
// library
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import useReactRouter from "use-react-router";
import { Smile, ChevronRight, Edit, Clock, Phone, MapPin, Twitter, Monitor, Facebook, Instagram, Sun, Moon } from 'react-feather';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RedirectFrom, RouteName, OwnerType, PriceArray } from '../../../common/Const';
import FooterActionBar from '../../organisms/FooterActionBar';
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
  },
  shopName: {
    marginRight: '4px',
  }
};

const Shop: React.FC = (props: any) => {
  const snsTags = [
    <Twitter size={24} color="#333" />,
    <Facebook size={24} color="#333" />,
    <Instagram size={24} color="#333" />,
    <Monitor size={24} color="#333" />
  ]
  const qs = queryString.parse(props.location.search);
  const redirectContext = useContext(RedirectContext);
  const { authState } = useContext(AuthContext);
  const { match }: any = useReactRouter();
  const [loading, setLoading] = useState(true);
  const [businessDate, setBusinessDate] = useState([]);
  const [businessExist, setBusinessExist] = useState(false);
  const [dayPriceObj, setDayPriceObj] = useState({
    id: 0,
    name: ''
  });
  const [nightPriceObj, setNightPriceObj] = useState({
    id: 0,
    name: ''
  });
  const [shopData, setShopData] = useState({
    id: 0,
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
    user: {
      is_owner: 0
    },
    links: [],
    coordination: {
      id: 0,
    }
  });

  const fetchShopData = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/${authState.user.is_owner ? 'owner' : 'user'}/shops/${match.params.id}`);
      if (isSubscribed) {
        setShopData(res.data);
        setDayPriceObj(PriceArray.find((data: any) => data.id === res.data.price_day))
        setNightPriceObj(PriceArray.find((data: any) => data.id === res.data.price_night))
        setBusinessDate(JSON.parse(res.data.business_date))
      }
    } catch (error) {
      if (error.message.match(/404/g)) props.history.push(RouteName.NOT_FOUND)
    }
  }

  useEffect(() => {
    if (businessDate.length !== 0) {
      if (businessDate.filter((data: any) => (data.opening !== data.closing) || data.is_close).length !== 0) {
        setBusinessExist(true)
      }
    }
  }, [businessDate])

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
          <HomeLayout headerText={shopData.name} prevRef={qs.from === 'accounts' ? RouteName.SELF_COMMENTS : qs.from ? `/users/${match.params.id}/comments` : `${RouteName.ROOT}?coord=${shopData.coordination.id}`} title={`covEAT/こびイート | ${shopData.name}の感染症対策詳細`}>
            <div className="content">
              <div className="shop-card">
                {/* ヘッダー画像 */}
                <section className="shop-card_section">
                  <div className="shop-img_wrapper">
                    <img className="shop-img" src={shopData.image} alt="shop header" />
                  </div>
                  <ol className="shop_base-info">
                    <li className="shop_base-info_option">
                      <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.shopName}>
                        {shopData.name}
                      </Text>
                      {shopData.user?.is_owner !== OwnerType.NOT_OWNER ?
                        <span className="official-mark">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.86668 1.80005L4.10002 6.56672L1.93335 4.40005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span> : <React.Fragment />
                      }
                    </li>
                    <li className="shop_base-info_option">
                      <ol className="shop_cost-list">
                        <li className="shop_cost-option">
                          <span className="shop_cost-icon_day">
                            <Sun size={10} color="#fff" />
                          </span>
                          <Text theme={[TextThemes.SMALL]}>
                            {dayPriceObj ? dayPriceObj.name : '- '}円
                          </Text>
                        </li>
                        <li className="shop_cost-option">
                          <span className="shop_cost-icon_night">
                            <Moon size={10} color="#fff" />
                          </span>
                          <Text theme={[TextThemes.SMALL]}>
                            {nightPriceObj ? nightPriceObj.name : '- '}円
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
                      <Text theme={[TextThemes.DARKGRAY, TextThemes.CAPTION]} propStyle={{ marginBottom: '4px' }}>その他の感染症対策</Text>
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
                          最高！ {shopData.good_count}件<br />
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
                  {!authState.user.is_owner &&
                    <React.Fragment>
                      <hr className="infection-control_hr" />
                      <Link to={`/shops/${match.params.id}/comments/new`}>
                        <Button
                          theme={[ButtonThemes.NORMAL]}
                          propStyle={propStyle.commentBtn}
                          onClick={() => redirectContext.setUri({
                            fromPath: RedirectFrom.NEW_COMMENT,
                            shop: match.params.id
                          })}>
                          <Edit size={20} color="#fff" />
                          <span className="infection-control_comment-text">感染対策のレビューを書く</span>
                        </Button>
                      </Link>
                    </React.Fragment>}
                </section>
                <hr className="shop_hr" />
                <section className="shop-card_section">
                  <ul className="shop_info-list">
                    <li className="shop_info-option">
                      <Clock size={16} color="#333" style={{ marginBottom: 'auto' }} />
                      <span className="shop_info-option_content">
                        {businessExist ?
                          businessDate.map((data: any, i: number) =>
                            <React.Fragment key={`business_date${i}`}>
                              <div className="shop-business">
                                <Text theme={[TextThemes.SMALL]} propStyle={{ marginRight: '20px' }}>
                                  {`${data.label}曜日`}
                                </Text>
                                <Text theme={[TextThemes.SMALL]}>
                                  {data.is_close ? '定休日' : data.opening === data.closing ? ' - ' : `${data.opening} 〜 ${data.closing}`}
                                </Text>
                              </div>
                            </React.Fragment>)
                          :
                          ['月', '火', '水', '木', '金', '土', '日'].map((data: any, i: number) =>
                            <React.Fragment key={`business_date${i}`}>
                              <div className="shop-business">
                                <Text theme={[TextThemes.SMALL]} propStyle={{ marginRight: '20px' }}>
                                  {`${data}曜日`}
                                </Text>
                                <Text theme={[TextThemes.SMALL]}>- </Text>
                              </div>
                            </React.Fragment>)}
                      </span>
                    </li>
                    <hr className="infection-control_hr" />
                    <li className="shop_info-option">
                      <Phone size={16} color="#333" />
                      <span className="shop_info-option_content">
                        {shopData.contact ? <a href={`tel:${shopData.contact}`}>{shopData.contact}</a> : '-'}
                      </span>
                    </li>
                    <hr className="infection-control_hr" />
                    <li className="shop_info-option">
                      <MapPin size={16} color="#333" />
                      <span className="shop_info-option_content">
                        <a href="#" onClick={() => { window.open('http://maps.google.co.jp/maps?q=' + encodeURI(shopData.address)); return false; }}>
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
                            {snsTags[(data.url_type - 1)]}
                          </Button>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
                {/* FIXME v2で実装 */}
                {/* <div style={{ display: 'none' }}>
                  <hr className="shop_hr" />
                  <section className="shop-card_section">
                    <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.shopedit}>
                      情報の編集をリクエスト
                  </Button>
                  </section>
                </div> */}
                {/* ここまで */}
              </div>
              <FooterActionBar initialAccent={0} />
              <style jsx>{`
                .content{
                  margin-bottom: 100px;
                }
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
                  max-width: 1000px;
                  margin: 0 auto;
                }
                .shop-img_wrapper{
                  width: 240px;
                  max-width: 80%;
                  height: 112px;
                  overflow: hidden;
                  margin: 0 auto;
                  margin-bottom: 32px;
                  background: ${CommonStyle.BgGray}
                }
                .shop-img{
                  width: 100%;
                  height: auto;
                }
                .official-mark{
                  background: ${CommonStyle.AccentColor};
                  width: 16px;
                  height: 16px;
                  border-radius: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                // 基本情報
                .shop_base-info{
                }
                .shop_base-info_option:not(:last-child){
                  margin-bottom: 8px;
                  display: flex;
                  align-items: center;
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
                  border-radius: 4px;
                  margin-bottom: 24px;
                }
                .infection-control_hr{
                  height: 1px;
                  margin: 0 0 24px -16px;
                  width: calc(100% + 32px);
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
                  margin-bottom: 24px;
                }
                .shop_info-option{
                  display: flex;
                  align-items: center;
                  font-weight: bold;
                  font-size: 12px;
                  color: ${CommonStyle.TextBlack}
                }
                .shop_info-option:not(:last-child){
                  margin-bottom: 24px;
                }
                .shop_info-option_content{
                  margin-left: 24px;
                }
                .shop-business{
                  display: flex;
                  margin-bottom: 12px;
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