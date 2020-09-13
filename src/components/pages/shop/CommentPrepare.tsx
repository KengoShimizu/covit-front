import React, { useState, useContext } from 'react';
// library
import { Search, X } from 'react-feather';
import axios from 'axios';
// components
import Modal from '../../molecules/Modal/Modal';
import HomeLayout from '../../templates/HomeLayout';
import HistoryCardList from '../../organisms/CardList/HistoryCardList';
import ShopCardList from '../../organisms/CardList/ShopCardList';
import Input, { InputThemes } from '../../atoms/Input';
import Loading from '../../molecules/Loading';
// common
import CommonStyle from './../../../common/CommonStyle';
import { RequestTextSection } from '../../molecules/RequestTextSection';
import FooterActionBar from '../../organisms/FooterActionBar';
// types
import Shop from '../../../types/Shop';
// context
import ModalContext from '../../../context/ModalContext';
import { RouteName } from '../../../common/Const';

interface SearchParam {
  name: string;
}

// コメント投稿のためのショップの検索
const CommentPrepare: React.FC = (props: any) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const modalContext = useContext(ModalContext);
  const [searchData, setSearchData] = useState<SearchParam>({
    name: '',
  });
  const [modalState, setModalState] = useState({
    title: '',
    subtitle: '',
    btntext: '',
    onClick: () => { },
  });

  const handleChange = (event: any) => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value
    })
  }

  const fetchShopsData = async () => {
    if(searchData.name !== '') {
      setLoading(true);
      await axios
        .get(`/api/v1/user/shops?name=${searchData.name}`)
        .then(result => {
          if(result.data.data.length === 0){
            setModalState({
              title: '検索したお店は\n現在登録されておりません。',
              subtitle: 'お店リクエスト機能を使って\nお店を登録しましょう！',
              btntext: 'リクエスト',
              onClick: () => props.history.push(RouteName.USER_SHOP_FORM),
            })
            modalContext.toggleModalShown(true);
          }
          setShops(result.data.data)
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setShops([]);
    }
  }

  const onKeyPressEnter = (event: any) => {
    if(event.key === 'Enter'){
      fetchShopsData()
    }
  }
  
  // useEffect(() => {
  //   if (searchData.name !== '') {
  //     let isSubscribed = true;
  //     const cleanup = () => {
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
      <Modal
        title={modalState.title}
        subtitle={modalState.subtitle}
        btntext={modalState.btntext}
        onClick={modalState.onClick}/>
      <div onKeyPress={onKeyPressEnter} style={{position: 'relative'}}>
        <Input
          theme={[InputThemes.INIT]}
          IconTheme={InputThemes.ICON_LEFT}
          handleChange={handleChange}
          name='name'
          placeholder='お店名で検索'
          content={searchData.name}
          icon={<Search onClick={fetchShopsData} size="16px" color="#8C8C8C" />}
          propStyle={{ margin: '24px auto 24px', maxWidth: '400px', width: '90%' }}
        />
        {searchData.name.length !== 0 && 
          <X size={24} 
            color={CommonStyle.BorderGray} 
            style={{
              position: 'absolute',
              top: '8px',
              right: '32px',
            }}
            onClick={() => {
              setSearchData({name: ''});
              setShops([]);
            }}
          />
        }
      </div>

      {
        shops.length ?
          loading ? <Loading /> : <ShopCardList shops={shops} type='search'/>
          :
          <React.Fragment>
            
            <HistoryCardList maxRow={4} type='search'/>
            <div className='mt10'>
              <RequestTextSection />
            </div>
          </React.Fragment>
      }
      <FooterActionBar initialAccent={2} propStyle={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }} />
      <style jsx>{`
        .mt10{
          margin: 44px 0 130px;
        }
      `}</style>
    </HomeLayout>
  );
}

export default CommentPrepare;