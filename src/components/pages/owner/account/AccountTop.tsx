import React, { useState, useContext, useEffect } from 'react';
// library
import axios from "axios";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// common
import { RouteName } from '../../../../common/Const';
// components
import PrivacyFotter from './../../../molecules/Footer/PrivacyFotter';
import OwnerShopCard from './../../../molecules/Card/OwnerShopCard';
import HomeLayout from '../../../templates/HomeLayout';
import OwnerAccountTopCardList from '../../../organisms/CardList/OwnerAccoutTopCardList';
import TopModal from '../../../molecules/Modal/TopModal';
import ToggleModal from '../../../molecules/Modal/ToggleModal';
import Modal from '../../../molecules/Modal/Modal';
import Button, { ButtonThemes } from './../../../atoms/Button';
// context
import AuthContext from "../../../../context/CommonProvider";
import TopModalContext from '../../../../context/TopModalContext';
import ModalContext from '../../../../context/ModalContext';

const propStyle = {
  btn: {
    margin: '8px auto',
    padding: '8px 55px',
  },
  privacy: {
    position: 'relative',
    padding: '50px 0 0',
  }
}
interface shopData {
  id: number;
  name: string;
  status: number;
};

const OwnerAccountTop: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const cookies = new Cookies();
  const topModalContext = useContext(TopModalContext);
  const modalContext = useContext(ModalContext);
  const [showState, setShowState] = useState(false);
  const [shopData, setShopData] = useState<shopData[]>([{
    id: 0,
    name: '',
    status: 0,
  }]);
  const [selectedShopIndex, setSelectedShopIndex] = useState(0);
  const [modalState, setModalState] = useState({
    title: '',
    subtitle: '',
    btntext: '',
    onClick: () => { }
  });

  const fetchOwnerShops = async () => {
    try{
      const res = await axios.get(`/api/v1/owner/shops?user_id=${authState.user.id}`);
      setShopData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteShop = async (shop_id: number) => {
    try{
      await axios.delete(`/api/v1/owner/shops/${shop_id}`);
      window.location.href = '/owner/accounts';
    } catch (error) {
      console.log(error)
    }
  }

  const deleteModal = (shop_id: number) => {
    setModalState({
      title: '本当にお店を削除しますか？',
      subtitle: '一度お店を削除すると、運営に直接連絡して頂かない限り、復元することはできません。',
      btntext: '削除する',
      onClick: () => deleteShop(shop_id)
    });
    modalContext.toggleModalShown(true);
  }

  const togglePublishShop = async (shop_id: number, status: number) => {
    try{
      const res = await axios.put(`/api/v1/owner/shops/update_status?id=${shop_id}`);
      fetchOwnerShops()
    } catch (error) {
      console.log(error)
    }
  }

  const publishModal = (shop_id: number, status: number) => {
    if (status === 2) { 
      setModalState({
        title: 'こちらのお店の公開を停止しますか？',
        subtitle: '',
        btntext: '停止する',
        onClick: () => togglePublishShop(shop_id, status)
      });
    } else if (status === 3) { 
      setModalState({
        title: 'こちらのお店を公開しますか？',
        subtitle: '',
        btntext: '公開する',
        onClick: () => togglePublishShop(shop_id, status)
      });
    }
    modalContext.toggleModalShown(true);
  }

  const handleLogout = (setContents: any) => {
    axios.post(`/api/v1/common/sessions/logout?token=${cookies.get('token')}`)
      .then(() => {
        setContents({
          isShown: true,
          text: {
            caption: 'ログアウトしました。'
          }
        });
        props.history.push(RouteName.ROOT);
      }).catch(() => {
        setContents({
          isShown: true,
          text: {
            caption: 'ログアウトに失敗しました。'
          }
        });
        props.history.push(RouteName.OWNER_ACCOUNT_TOP);
      })
  }
  const handleDeleteAccount = (setContents: any) => {
    axios.delete(`/api/v1/user/users/${authState.user.id}`)
      .then(() => {
        setContents({
          isShown: true,
          text: {
            caption: 'アカウントの削除が完了しました。',
            small: '今までご利用ありがとうございました！'
          }
        });
        props.history.push(RouteName.ROOT);
      }).catch(() => {
        setContents({
          isShown: true,
          text: {
            caption: 'アカウントの削除に失敗しました。'
          }
        });
        props.history.push(RouteName.OWNER_ACCOUNT_TOP);
      })
  }

  const handleModalState = (i: number, toggleModalShown: any) => {
    if (i === 0){
      setModalState({
        title: 'ログアウトしてよろしいですか？',
        subtitle: '',
        btntext: 'ログアウト',
        onClick: () => handleLogout(topModalContext.setContents)
      });
    } else {
      setModalState({
        title: '本当にアカウントを削除しますか？',
        subtitle: 'アカウントを削除すると、レビューなどの情報が全て削除され復元はできません。',
        btntext: '削除する',
        onClick: () => handleDeleteAccount(topModalContext.setContents)
      });
    }
    toggleModalShown(true);
  }

  useEffect(() => {
    fetchOwnerShops();
  }, [])

  useEffect(() => {
    if (topModalContext.contents.isShown){
      setTimeout(() => {
        topModalContext.setContents({
          isShown: false,
          text: {
            caption: ''
          }
        })
      }, 3000)
    }
  }, [topModalContext.contents.isShown]);

  return (
    <HomeLayout headerText={'マイページ'} prevRef='#' noBtn={true}>
      <TopModal/>
      <Modal
        title={modalState.title}
        subtitle={modalState.subtitle}
        btntext={modalState.btntext}
        onClick={modalState.onClick}/>
      {showState && <ToggleModal shop_names={shopData.map((data: any) => data.name)} setShowState={setShowState} showState={showState} selectedShopIndex={selectedShopIndex} setSelectedShopIndex={setSelectedShopIndex}/>}
      {shopData.length !== 0 && <OwnerShopCard shop={shopData[selectedShopIndex]} deleteModal={deleteModal} publishModal={publishModal}/>}
      
      {/* FIXME お店登録が一つもない時に「登録しましょう！」的なのほしい */}
      {shopData.length > 1 &&
        <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.btn} onClick={() => setShowState(true)}>お店を切り替え</Button>
      }
      <Link to={RouteName.OWNER_SHOP_FORM}>
        <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.btn}>お店を追加する</Button>
      </Link>

      <OwnerAccountTopCardList handleModalState={handleModalState} toggleModalShown={modalContext.toggleModalShown}/>
      <PrivacyFotter propStyle={propStyle.privacy}/>
    </HomeLayout>
  );
}

export default OwnerAccountTop;