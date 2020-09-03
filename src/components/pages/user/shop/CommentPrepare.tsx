import React, { useState } from 'react';
// library
import { Search } from 'react-feather';
import axios from 'axios';
// components
import HomeLayout from '../../../templates/HomeLayout';
import HistoryCardList from '../../../organisms/CardList/HistoryCardList';
import ShopCardList from '../../../organisms/CardList/ShopCardList';
import Input from '../../../atoms/Input';
import Text, { TextThemes } from '../../../atoms/Text';
import Loading from '../../../molecules/Loading';
// common
import { RequestTextSection } from '../../../molecules/RequestTextSection';
import FooterActionBar from '../../../organisms/FooterActionBar';
// types
import Shop from '../../../../types/Shop';

interface SearchParam {
  name: string;
}

// コメント投稿のためのショップの検索
export const CommentPrepare: React.FC = (props: any) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchParam>({
    name: '',
  });

  const handleChange = (event: any) => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value
    })
  }

  const fetchShopsData = async () => {
    setLoading(true);
    await axios
      .get(`/api/v1/user/shops?name=${searchData.name}`)
      .then(result => setShops(result.data.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  const onKeyPressEnter = (event: any) => {
    if(event.key === 'Enter'){
      fetchShopsData()
    }
  }

  // リアルタイム検索したかったけど今回なぜかうまくいかないので一旦削除
  // 検索アイコン押された時に検索するようにした

  // useEffect(() => {
  //   if (searchData.name !== '') {
  //     let isSubscribed = true;
  //     const cleanup = () => {
  //       console.log("clean:"+searchData.name)
  //       isSubscribed = false;
  //     };
  //     if(isSubscribed){
  //       fetchShopsData();
  //     }
  //     return cleanup;
  //   }
  // }, [searchData.name])

  return (
    <HomeLayout headerText='お店のレビューを登録する' prevRef='/'>
      <div onKeyPress={onKeyPressEnter}>
      <Input
        handleChange={handleChange}
        name='name'
        placeholder='お店名で検索'
        content={searchData.name}
        icon={<Search onClick={fetchShopsData}/>}
        propStyle={{ margin: '16px auto', maxWidth: '330px', width: '90%' }}
      />
      </div>

      {
        shops.length ?
          loading ? <Loading /> : <ShopCardList shops={shops} />
          :
          <React.Fragment>
            <Text theme={[TextThemes.CAPTION]} propStyle={{ margin: '4px 10px' }}>閲覧履歴</Text>
            <HistoryCardList maxRow={4} props={props} type='search' />
            <div className='mt10'>
              <RequestTextSection />
            </div>
          </React.Fragment>
      }
      <FooterActionBar initialAccent={2} propStyle={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }} />
      <style jsx>{`
        .mt10{
          margin: 45px 0 130px;
        }
      `}</style>
    </HomeLayout>
  );
}