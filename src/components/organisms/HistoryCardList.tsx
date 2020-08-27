import React, { useState, useEffect } from 'react';
import { CommonStyle } from './../../common/CommonStyle';
import { HistoryCard } from './../molecules/HistoryCard';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Text, { TextThemes } from './../atoms/Text';

const propStyle = {
  errorText: {
    color: CommonStyle.AccentColor,
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  }
}

export const HistoryCardList: React.FC = () => {
  const cookies = new Cookies();
  const cookie_histories = cookies.get('histories');
  const cookie_histories_date = cookies.get('histories_date');
  const [err, setErr] = useState("");
  const [shopData, setShopData] = useState([]);
  const [historyElements, setHistoryElements] = useState([]);

  const fetchShopData = () => {
    axios.get(`/api/v1/user/shops?histories=${cookie_histories}`)
    .then(res => setShopData(res.data))
    .catch(err => setErr('存在しないお店があります。'));
  }

  useEffect(() => {
    if(cookie_histories){
      fetchShopData();
    }
  }, [])

  useEffect(() => {
    if(shopData.length){
      const history_elements: any = [];
      const histories_date = cookie_histories_date.split(',')
      cookie_histories.split(',').map((shop_id: string, i: number) => {
        const shop: any = shopData.find((data: any) => data.id === parseInt(shop_id))
        history_elements.push(
          <HistoryCard 
            name={shop.name} 
            good_count={shop.good_count} 
            bad_count={shop.bad_count} 
            browse_date={histories_date[i]} 
            nextRef={`/shops/${shop.id}`}
            key={`history${i}`}/>
        )})
        setHistoryElements(history_elements);
    }
  }, [shopData])

  return (
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