import React, { useEffect, useState, useContext } from 'react';
// library
import axios from "axios";
import queryString from 'query-string';
// template
import HomeLayout from '../../../../templates/HomeLayout';
// context
import TopModalContext from '../../../../../context/TopModalContext';
import AuthContext from "../../../../../context/CommonProvider";
// common
import { RouteName, TopModalTime } from '../../../../../common/Const';
// types
import Link from '../../../../../types/Link';
// components
import { InfectionControl } from '../../../../organisms/ShopForm/InfectionControl';
import { ShopInfo } from '../../../../organisms/ShopForm/ShopInfo';
import OwnerInfo from '../../../../organisms/ShopForm/OwnerInfo';
import TopModal from '../../../../molecules/Modal/TopModal';

interface AddParam {
  owner: {
    name: string;
    kana_name: string;
  },
  shop: {
    name: string;
    kana_name: string;
    address: string;
    contact: string;
    image: string;
    business_date: string;
    price_day: number;
    price_night: number;
    other_step: string;
  };
  step_ids: number[];
  genre_id: number;
  links: Link[];
}

const OwnerShopForm: React.FC = (props: any) => {
  const qs = queryString.parse(props.location.search);
  const { authState } = useContext(AuthContext);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState<string>('');
  const topModalContext = useContext(TopModalContext);
  const noKanaName = !authState.user.kana_name;
  const totalPage = noKanaName ? 3 : 2;
  const [addData, setAddData] = useState<AddParam>({
    owner: {
      name: authState.user.name ? authState.user.name : "",
      kana_name: authState.user.kana_name ? authState.user.kana_name : "",
    },
    shop: {
      name: "",
      kana_name: "",
      address: "",
      contact: "",
      image: "",
      business_date: "",
      price_day: 0,
      price_night: 0,
      other_step: ""
    },
    step_ids: [],
    genre_id: 0,
    links: []
  });

  const handleOwnerChange = (event: any) => {
    setAddData({
      ...addData,
      owner: {
        ...addData.owner,
        [event.target.name]: event.target.value
      }
    });
  }

  const post = async (pageNum: number) => {
    try{
      if(pageNum === 2) setLoad2(true)
      if(pageNum === 3) setLoad3(true)
      await axios.post('/api/v1/owner/shops', addData)
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'お店の登録をリクエストしました！',
          small: 'お店の承認には数日かかる可能性があります。'
        }
      });
      props.history.push(RouteName.OWNER_ACCOUNT_TOP);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setErr('');
  }, [addData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page])

  useEffect(() => {
    if (topModalContext.contents.isShown){
      setTimeout(() => {
        topModalContext.setContents({
          isShown: false,
          text: {
            caption: ''
          }
        })
      }, TopModalTime)
    }
  }, [topModalContext.contents.isShown]);

  useEffect(() => {
    if(qs.state === 'new'){
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: '登録が完了いたしました！',
          small: 'お店の情報の入力をお願いします。'
        }
      });
    }
  }, [])

  return (
    <React.Fragment>
      {page === 1 &&
        <HomeLayout headerText={`お店の情報登録(1/${totalPage})`} prevRef={RouteName.OWNER_ACCOUNT_TOP}>
          <TopModal/>
          <div className="container">
            <ShopInfo setPage={setPage} setAddData={setAddData} addData={addData} />
          </div>
        </HomeLayout>}
      {page === 2 &&
        <HomeLayout headerText={`お店の情報登録(2/${totalPage})`} onClick={() => setPage(1)}>
          <div className="container">
            <InfectionControl setPage={setPage} setAddData={setAddData} addData={addData} noKanaName={noKanaName} post={noKanaName? undefined : post} load2={load2}/>
          </div>
        </HomeLayout>}
      {page === 3 && noKanaName &&
        <HomeLayout headerText="お店の情報登録(3/3)" onClick={() => setPage(2)}>
          <div className="container">
            <OwnerInfo post={post} handleChange={handleOwnerChange} addData={addData} load3={load3}/>
          </div>
        </HomeLayout>}
      <style jsx>
        {`
          .container {
            width: 100%;
            max-width: 330px;
            margin: 30px auto 0;
          }
        `}
      </style>
    </React.Fragment>
  );
}

export default OwnerShopForm;