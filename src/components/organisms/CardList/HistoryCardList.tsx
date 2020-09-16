import React, { useState, useEffect } from 'react';
// library
import axios from 'axios';
// common
import CommonStyle from '../../../common/CommonStyle';
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
  type?: string;
}

const HistoryCardList: React.FC<HistoryCardListProps> = ({ maxRow, type }) => {
  const [loading, setLoading] = useState(false);
  const histories = localStorage.getItem('histories');
  const histories_date = localStorage.getItem('histories_date');
  const [err, setErr] = useState("");
  const [shopData, setShopData] = useState([]);
  const [historyElements, setHistoryElements] = useState([]);
  let arr: number[], arr_date: string[];
  if(histories) arr = JSON.parse(histories)
  if(histories_date) arr_date = JSON.parse(histories_date)

  const fetchShopData = async (isSubscribed: boolean, arr: number[]) => {
    try {
      const res = await axios.get(`/api/v1/user/shops?histories=${arr}`);
      if (isSubscribed) setShopData(res.data);
    } catch (error) {
      setErr('存在しないお店があります。')
    }
  }

  useEffect(() => {
    if (histories && histories_date) {
      let isSubscribed = true;
      setLoading(true);
      fetchShopData(isSubscribed, arr);
      setLoading(false);
      const cleanup = () => {
        isSubscribed = false;
      };
      return cleanup;
    } else {
      setErr('閲覧履歴が存在しません')
      setHistoryElements([]);
    }
  }, [])

  useEffect(() => {
    if (arr && arr_date && shopData.length !== 0) {
      if (shopData.length) {
        const history_elements: any = [];
        arr.map((shop_id: number, index: number) => {
          if (!shopData.filter((shop: Shop) => shop.id === Number(shop_id)).length) {
            arr.splice(index, 1);
            arr_date.splice(index, 1);
          }
        })
        shopData.map((shop: Shop, i: number) => {
          if (maxRow && i >= maxRow) {
            return
          }
          if (type === 'search') {
            history_elements.push(
              <SearchHistoryCard
                name={shop.name}
                browse_date={arr_date[i]}
                // nextRef={`/shops/${shop.id}/comments/new?from=search`}
                nextRef={`/shops/${shop.id}?from=search`}
                key={`history${i}`} />
            )
          } else {
            history_elements.push(
              <HistoryCard
                name={shop.name}
                good_count={shop.good_count}
                bad_count={shop.bad_count}
                browse_date={arr_date[i]}
                nextRef={`/shops/${shop.id}?from=history`}
                key={`history${i}`} />
            )
          }
        })
        setHistoryElements(history_elements);
      }
    }
  }, [shopData])

  return (
    loading ? <Loading /> :
      <div className="container">
        <Text theme={[TextThemes.CAPTION]} propStyle={{ marginBottom: '4px', paddingLeft: '16px' }}>閲覧履歴</Text>
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