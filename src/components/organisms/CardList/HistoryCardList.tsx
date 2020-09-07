import React, { useState, useEffect } from 'react';
// library
import axios from 'axios';
import Cookies from 'universal-cookie';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RouteName } from '../../../common/Const';
// components
import HistoryCard from '../../molecules/Card/HistoryCard';
import SearchHistoryCard from '../../molecules/Card/SearchHistoryCard';
import Text, { TextThemes } from '../../atoms/Text';
import Loading from '../../molecules/Loading';
import Shop from '../../../types/Shop';

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
  type?: string;
}

const HistoryCardList: React.FC<HistoryCardListProps> = ({ maxRow, props, type }) => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
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
      setErr('閲覧履歴が存在しません')
      setHistoryElements([]);
    }
  }, [cookies.get('histories')])

  useEffect(() => {
    if (shopData.length) {
      const history_elements: any = [];
      var histories_date = cookie_histories_date.split(',')
      var histories_ids = cookie_histories.split(',')
      histories_ids.map((shop_id: number, index: number) => {
        if (!shopData.filter((shop: Shop) => shop.id === Number(shop_id)).length) {
          histories_date.splice(index, 1, null);
        }
      })
      histories_date = histories_date.filter((history: any) => !!history)
      shopData.map((shop: Shop, i: number) => {
        if (maxRow && i >= maxRow) {
          return
        }
        if (type === 'search') {
          history_elements.push(
            <SearchHistoryCard
              name={shop.name}
              browse_date={histories_date[i]}
              nextRef={`/shops/${shop.id}/comments/new`}
              key={`history${i}`} />
          )
        } else {
          history_elements.push(
            <HistoryCard
              name={shop.name}
              good_count={shop.good_count}
              bad_count={shop.bad_count}
              browse_date={histories_date[i]}
              nextRef={`/shops/${shop.id}`}
              key={`history${i}`} />
          )
        }
      })
      setHistoryElements(history_elements);
    }
  }, [shopData])

  return (
    loading ? <Loading /> :
      <div className="container">
        <Text theme={[TextThemes.CAPTION]} propStyle={{ marginBottom: '4px' }}>閲覧履歴</Text>
        <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.errorText}>{err}</Text>
        <ol className="card-list">
          {historyElements}
        </ol>
        <style jsx>{`
        .container{
          max-width: 600px;
          margin: 0 auto;
        }
        .account-function_list{
          padding: 0 16px;
        }
        .account-function_hr{
          height: 2px;
          margin: 0 0 12px 0;
          background: ${CommonStyle.BgGray}
        }
        .card-list{
          background: ${CommonStyle.BgGray};
          width: 100%;
          padding: 18px 16px;
          box-sizing: border-box;
        }
      `}</style>
      </div>
  );
}

export default HistoryCardList;