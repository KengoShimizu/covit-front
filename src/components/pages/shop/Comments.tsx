import React, { useContext, useState, useEffect } from 'react';
// library
import useReactRouter from "use-react-router";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// components
import HomeLayout from '../../templates/HomeLayout';
import CommnetsCardList from '../../organisms/CardList/CommentsCardList';
import AuthContext from "../../../context/CommonProvider";
import { OwnerType, RouteName } from '../../../common/Const';
import Loading from '../../molecules/Loading';
import FooterActionBar from './../../organisms/FooterActionBar';

// ショップのコメント一覧
const ShopComments: React.FC = (props: any) => {
  const { match }: any = useReactRouter();
  const { authState } = useContext(AuthContext);
  const [shopUserID, setShopUserID] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/user/shops/${match.params.id}`);
      setShopUserID(res.data.user_id);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchData();
    }
    const cleanup = () => {
      unmounted = true;
    }
    return cleanup;
  }, [])

  return (
    loading ?
      <Loading />
      :
      shopUserID && authState.user.is_owner !== OwnerType.NOT_OWNER && shopUserID !== authState.user.id ?
        <Redirect to={RouteName.ACCOUNT_TOP} />
        :
        <HomeLayout headerText={'コメント一覧'} prevRef={`/shops/${match.params.id}`}>
          <div className="container">
            <CommnetsCardList sqlQuery={`shop_id=${match.params.id}`}/>
            {!authState.user.is_owner &&<FooterActionBar initialAccent={0}/>}
          </div>
          <style jsx>{`
            .container{
              max-width: 1000px;
              margin: 0 auto;
            }
          `}</style>
        </HomeLayout>
  );
}

export default ShopComments;