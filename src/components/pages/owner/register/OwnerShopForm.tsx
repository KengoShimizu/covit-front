import React, { useEffect, useState, useContext } from 'react';
// library
import axios from "axios";
import queryString from 'query-string';
// template
import HomeLayout from '../../../templates/HomeLayout';
// context
import AuthContext from './../../../../context/CommonProvider';
// types
import Link from './../../../../types/Link'
// others
import { InfectionControl } from './../../../organisms/ShopForm/InfectionControl';
import { ShopInfo } from './../../../organisms/ShopForm/ShopInfo';
import OwnerInfo from './../../../organisms/ShopForm/OwnerInfo';

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

export const OwnerShopForm: React.FC = (props: any) => {
  const qs = queryString.parse(props.location.search);
  const [page, setPage] = useState(qs.page ? Number(qs.page) : 1);
  const [err, setErr] = useState<string>('');
  const [addData, setAddData] = useState<AddParam>({
    owner: {
      name: "",
      kana_name: "",
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

  const handleChange = (event: any) => {
    setAddData({
      ...addData,
      [event.target.name]: event.target.value
    });
  }

  const handleOwnerChange = (event: any) => {
    setAddData({
      ...addData,
      owner: {
        ...addData.owner,
        [event.target.name]: event.target.value
      }
    });
  }

  const post = async () => {
    await axios.post('/api/v1/owner/shops', addData)
      .catch(err => console.log(err))
      .finally(() => console.log('FIXME 遷移先'));
    return;
  }

  useEffect(() => {
    setErr('');
  }, [addData])

  return (
    <React.Fragment>
      {page === 1 &&
        <HomeLayout subHeaderText="01 お店の情報について" prevRef='#' history={props.history}>
          <div className="container">
            <InfectionControl setPage={setPage} setAddData={setAddData} addData={addData}/>
          </div>
        </HomeLayout>}
      {page === 2 &&
        <HomeLayout subHeaderText="02 お店の情報について" onClick={() => setPage(1)}>
          <div className="container">
            <ShopInfo setPage={setPage} setAddData={setAddData} addData={addData} />
          </div>
        </HomeLayout>}
      {page === 3 &&
        <HomeLayout subHeaderText="03 担当者様について" onClick={() => setPage(2)}>
          <div className="container">
            <OwnerInfo post={post} handleChange={handleOwnerChange} addData={addData}/>
          </div>
        </HomeLayout>}
      <style jsx>
        {`
          .container {
            width: 100%;
            max-width: 330px;
            margin: 0 auto;
          }
        `}
      </style>
    </React.Fragment>
  );
}