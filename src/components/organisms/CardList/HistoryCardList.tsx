import React, { useState, useEffect } from 'react';
// library
import axios from 'axios';
import Cookies from 'universal-cookie';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RouteName } from '../../../common/Const';
// components
import HistoryCard from '../../molecules/Card/HistoryCard';
import Text, { TextThemes } from '../../atoms/Text';

const propStyle = {
  errorText: {
    color: CommonStyle.AccentColor,
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  }
}

interface HistoryCardListProps {
  maxRow?: number;
  props?: any;
}

const HistoryCardList: React.FC<HistoryCardListProps> = ({ maxRow, props }) => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const cookie_histories = cookies.get('histories');
  const cookie_histories_date = cookies.get('histories_date');
  const [err, setErr] = useState("");
  const [shopData, setShopData] = useState([]);
  const [historyElements, setHistoryElements] = useState([]);

  const fetchShopData = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/user/shops?histories=${cookie_histories}`);
      if (isSubscribed) setShopData(res.data);
    } catch (error) {
      setErr('存在しないお店があります。')
    }
  }

  useEffect(() => {
    if (cookie_histories) {
      let isSubscribed = true;
      setLoading(true);
      fetchShopData(isSubscribed);
      setLoading(false);
      const cleanup = () => {
        isSubscribed = false;
      };
      return cleanup;
    } else {
      setHistoryElements([]);
    }
  }, [cookies.get('histories')])

  useEffect(() => {
    if(shopData.length){
      const history_elements: any = [];
      const histories_date = cookie_histories_date.split(',')
      cookie_histories.split(',').map((shop_id: string, i: number) => {
        if (maxRow && i >= maxRow) {
          return
        } 
        const shop: any = shopData.find((data: any) => data.id === parseInt(shop_id))
        history_elements.push(
          <HistoryCard 
            name={shop.name} 
            good_count={shop.good_count} 
            bad_count={shop.bad_count} 
            browse_date={histories_date[i]} 
            nextRef={props.match.path === RouteName.SHOP_SEARCH_FOR_COMMENTS ? `/shops/${shop.id}/comments/new`  : `/shops/${shop.id}`}
            key={`history${i}`}/>
        )})
        setHistoryElements(history_elements);
    }
  }, [shopData])

  return (
    loading ? <div></div> :
    <div className="container">
      <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.errorText}>{err}</Text>
      <ol className="card-list">
        {historyElements}
      </ol>
      <style jsx>{`
        .account-function_list{
          padding: 0 16px;
        }
        .account-function_hr{
          height: 2px;
          margin: 0 0 12px 0;
          background: ${CommonStyle.BgGray}
        }
      `}</style>
    </div>
  );
}

export default HistoryCardList;