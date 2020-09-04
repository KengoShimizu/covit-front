import React, { useEffect, useState, useContext } from 'react';
// library
import axios from "axios";
import queryString from 'query-string';
// common
import { RouteName } from '../../../../../common/Const';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import { InfectionControl } from '../../../../organisms/ShopForm/InfectionControl';
import Button, { ButtonThemes } from './../../../../atoms/Button';
// context
import TopModalContext from '../../../../../context/TopModalContext';
// types
import Link from '../../../../../types/Link'


interface EditParam {
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

const OwnerInfectionEdit: React.FC = (props: any) => {
  const qs = queryString.parse(props.location.search);
  const topModalContext = useContext(TopModalContext);
  const [err, setErr] = useState<string>('');
  const [editData, setEditData] = useState<EditParam>({
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

  const fetchInfections = async () => {
    try{
      // FIXME match.params.id、
      const res = await axios.get(`/api/v1/owner/shops/${1}`);
      setEditData({
        ...editData,
        shop: {
          name: "",
          kana_name: "",
          address: "",
          contact: "",
          image: "",
          business_date: "",
          price_day: 0,
          price_night: 0,
          other_step: res.data.other_step
        },
        step_ids: res.data.steps.map((data: any) => data.id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    try{
      // FIXME match.params.id
      await axios.patch(`/api/v1/owner/shops/${1}`, editData)
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: '感染対策情報を更新しました！'
        }
      });
      props.history.push(RouteName.OWNER_ACCOUNT_TOP);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setErr('');
  }, [editData])

  useEffect(() => {
    fetchInfections();
  }, [])

  return (
    <HomeLayout headerText="感染対策の内容" prevRef={RouteName.OWNER_ACCOUNT_TOP}>
      <div className="container">
        <Button theme={[ButtonThemes.SUBBTN]}>変更する</Button>
        <InfectionControl setAddData={setEditData} addData={editData} post={update}/>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            max-width: 330px;
            margin: 30px auto 0;
          }
        `}
      </style>
      </HomeLayout>
  );
}

export default OwnerInfectionEdit;