import React, { useEffect, useState, useContext } from 'react';
// library
import axios from "axios";
import useReactRouter from "use-react-router";
// common
import { RouteName } from '../../../../../common/Const';
// component
import { ShopInfo } from '../../../../organisms/ShopForm/ShopInfo';
import Button, { ButtonThemes } from './../../../../atoms/Button';
// template
import HomeLayout from '../../../../templates/HomeLayout';
// types
import Link from '../../../../../types/Link'
// context
import TopModalContext from '../../../../../context/TopModalContext';

interface EditParam {
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
  genre_id: number;
  links: Link[];
}

const propStyle = {
  changeBtn: {
    position: 'fixed',
    right: '45px',
    top: '75px',
  }
}

const OwnerShopInfoEdit: React.FC = (props: any) => {
  // linksだけ切り分けてるのは無限ループに陥ってしまうから
  const [defaultLinks, setDefaultLinks] = useState<Link[]>([]);
  const { match }: any = useReactRouter();
  const topModalContext = useContext(TopModalContext);
  const [err, setErr] = useState<string>('');
  const [editData, setEditData] = useState<EditParam>({
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
    genre_id: 0,
    links: []
  });

  const handleChange = (event: any) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value
    });
  }

  const fetchData = async () => {
    try{
      const res = await axios.get(`/api/v1/owner/shops/${match.params.id}`);
      setEditData({
        ...editData,
        shop: {
          name: res.data.name,
          kana_name: res.data.kana_name,
          address: res.data.address,
          contact: res.data.contact,
          image: res.data.image,
          business_date: res.data.business_date,
          price_day: res.data.price_day,
          price_night: res.data.price_night,
          other_step: res.data.other_step
        },
        genre_id: res.data.coordination.genre_id,
        links: res.data.links
      });
      setDefaultLinks(res.data.links);
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    try{
      await axios.patch(`/api/v1/owner/shops/${match.params.id}`, editData)
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'お店情報を更新しました！'
        }
      });
      props.history.push(RouteName.OWNER_ACCOUNT_TOP);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setErr('');
  }, [editData])

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <React.Fragment>
      <HomeLayout headerText="お店の情報登録" prevRef={RouteName.OWNER_ACCOUNT_TOP}>
        <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.changeBtn} onClick={update}>変更する</Button>
        <div className="container">
          <ShopInfo setAddData={setEditData} addData={editData} defaultLinks={defaultLinks}/>
        </div>
      </HomeLayout>
      <style jsx>{`
        .container {
          width: 100%;
          max-width: 330px;
          margin: 30px auto 0;
        }
      `}</style>
    </React.Fragment>
  );
}

export default OwnerShopInfoEdit;