import React, { useEffect, useState, useContext } from 'react';
// library
import axios from "axios";
import queryString from 'query-string';
// template
import HomeLayout from '../../../../templates/HomeLayout';
// context
import AuthContext from '../../../../../context/CommonProvider';
import TopModalContext from '../../../../../context/TopModalContext';
// types
import Link from '../../../../../types/Link'
// others
import { InfectionControl } from '../../../../organisms/ShopForm/InfectionControl';
import { ShopInfo } from '../../../../organisms/ShopForm/ShopInfo';
import { RouteName } from '../../../../../common/Const';

interface AddParam {
  shop: {
    user_id: number;
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

const UserShopForm: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const qs = queryString.parse(props.location.search);
  const [page, setPage] = useState(qs.page ? Number(qs.page) : 1);
  const topModalContext = useContext(TopModalContext);
  const [err, setErr] = useState<string>('');
  const [addData, setAddData] = useState<AddParam>({
    shop: {
      user_id: authState.user.id,
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

  const post = async () => {
    try{
      await axios.post('/api/v1/user/shops', addData)
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'お店の登録をリクエストしました！',
          small: 'お店の承認には数日かかる可能性があります。'
        }
      });
      props.history.push(RouteName.ROOT);
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

  return (
    <React.Fragment>
      {page === 1 ?
        <HomeLayout headerText="お店の情報登録(1/2)" prevRef={RouteName.SHOP_SEARCH_FOR_COMMENTS}>
          <div className="container">
            <ShopInfo setPage={setPage} setAddData={setAddData} addData={addData} />
          </div>
        </HomeLayout>
        :
        <HomeLayout headerText="お店の情報登録(2/2)" onClick={() => setPage(1)}>
          <div className="container">
            <InfectionControl setPage={setPage} setAddData={setAddData} addData={addData} post={post}/>
          </div>
        </HomeLayout>
      }
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

export default UserShopForm;