import React, { useState, useContext, useEffect } from 'react';
// library
import axios from "axios";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// common
import { RouteName, TopModalTime } from '../../../../common/Const';
// components
import PrivacyFotter from './../../../molecules/Footer/PrivacyFotter';
import OwnerShopCard from './../../../molecules/Card/OwnerShopCard';
import HomeLayout from '../../../templates/HomeLayout';
import OwnerAccountTopCardList from '../../../organisms/CardList/OwnerAccoutTopCardList';
import TopModal from '../../../molecules/Modal/TopModal';
import ToggleModal from '../../../molecules/Modal/ToggleModal';
import Modal from '../../../molecules/Modal/Modal';
import Button, { ButtonThemes } from './../../../atoms/Button';
import Text, { TextThemes } from './../../../atoms/Text';
import Loading from './../../../molecules/Loading';
// context
import AuthContext from "../../../../context/CommonProvider";
import TopModalContext from '../../../../context/TopModalContext';
import ModalContext from '../../../../context/ModalContext';

const propStyle = {
  btn: {
    margin: '8px auto',
    padding: '8px 56px',
  },
  privacy: {
    position: 'relative',
    padding: '50px 0 0',
  },
  registerText: {
    textAlign: 'center',
    padding: '24px 0 8px',
  }
}
interface shopData {
  id: number;
  name: string;
  status: number;
};

const OwnerAccountTop: React.FC = (props: any) => {
  const { authState, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const topModalContext = useContext(TopModalContext);
  const modalContext = useContext(ModalContext);
  const [showState, setShowState] = useState(false);
  const [selectedShopIndex, setSelectedShopIndex] = useState(cookies.get('array_index') ? parseInt(cookies.get('array_index')) : 0);
  const [shopData, setShopData] = useState<shopData[]>([{
    id: 0,
    name: '',
    status: 0,
  }]);
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

  const deleteShop = async (shop_id: number, shop_name: string) => {
    try{
      await axios.delete(`/api/v1/owner/shops/${shop_id}`);
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: `${shop_name}????????????????????????`
        }
      }); 
      cookies.set('array_index', 0, { path: '/' })
      document.body.setAttribute('style', 'pointer-events: none; overflow: hidden;')
      setTimeout(() => {
        document.body.removeAttribute('style')
        window.location.reload(false);
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteModal = (shop_id: number, shop_name: string) => {
    setModalState({
      title: '???????????????????????????????????????',
      subtitle: '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
      btntext: '????????????',
      onClick: () => deleteShop(shop_id, shop_name)
    });
    modalContext.toggleModalShown(true);
  }

  const togglePublishShop = async (shop_id: number, status: number) => {
    try{
      await axios.put(`/api/v1/owner/shops/update_status?id=${shop_id}`);
      fetchOwnerShops()
    } catch (error) {
      console.log(error)
    }
  }

  const publishModal = (shop_id: number, status: number) => {
    if (status === 2) { 
      setModalState({
        title: '???????????????????????????????????????????????????',
        subtitle: '',
        btntext: '????????????',
        onClick: () => togglePublishShop(shop_id, status)
      });
    } else if (status === 3) { 
      setModalState({
        title: '??????????????????????????????????????????',
        subtitle: '',
        btntext: '????????????',
        onClick: () => togglePublishShop(shop_id, status)
      });
    }
    modalContext.toggleModalShown(true);
  }

  const handleLogout = (setContents: any) => {
    document.body.setAttribute('style', 'pointer-events: none; overflow: hidden;')
    axios.post(`/api/v1/common/sessions/logout?token=${cookies.get('token')}`)
      .then(() => {
        setAuth({
          isLogin: false,
          user: {
            id: 0,
            name: "",
            kana_name: "",
            email: "",
            image: "",
            token: "",
            is_owner: 0,
            created_at: "",
            updated_at: ""
          }
        })
        setContents({
          isShown: true,
          text: {
            caption: '??????????????????????????????'
          }
        });
        document.body.removeAttribute('style');
        props.history.push(RouteName.ROOT);
      }).catch(() => {
        setContents({
          isShown: true,
          text: {
            caption: '???????????????????????????????????????'
          }
        });
        document.body.removeAttribute('style');
        props.history.push(RouteName.OWNER_ACCOUNT_TOP);
      })
  }
  const handleDeleteAccount = (setContents: any) => {
    document.body.setAttribute('style', 'pointer-events: none; overflow: hidden;')
    axios.delete(`/api/v1/user/users/${authState.user.id}`)
      .then(() => {
        setAuth({
          isLogin: false,
          user: {
            id: 0,
            name: "",
            kana_name: "",
            email: "",
            image: "",
            token: "",
            is_owner: 0,
            created_at: "",
            updated_at: ""
          }
        })
        setContents({
          isShown: true,
          text: {
            caption: '????????????????????????????????????????????????',
            small: '??????????????????????????????????????????????????????'
          }
        });
        document.body.removeAttribute('style');
        props.history.push(RouteName.ROOT);
      }).catch(() => {
        setContents({
          isShown: true,
          text: {
            caption: '????????????????????????????????????????????????'
          }
        });
        document.body.removeAttribute('style');
        props.history.push(RouteName.OWNER_ACCOUNT_TOP);
      })
  }

  const handleModalState = (i: number, toggleModalShown: any) => {
    if (i === 0){
      setModalState({
        title: '?????????????????????????????????????????????',
        subtitle: '',
        btntext: '???????????????',
        onClick: () => handleLogout(topModalContext.setContents)
      });
    } else {
      setModalState({
        title: '????????????????????????????????????????????????',
        subtitle: '?????????????????????????????????????????????????????????????????????????????????????????????',
        btntext: '????????????',
        onClick: () => handleDeleteAccount(topModalContext.setContents)
      });
    }
    toggleModalShown(true);
  }

  const handleSelect = (i: number) => {
    setSelectedShopIndex(i); 
    setShowState(false)
    cookies.set('array_index', i, { path: '/' });
  }

  useEffect(() => {
    setLoading(true);
    fetchOwnerShops();
    setLoading(false);
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
      }, TopModalTime)
    }
  }, [topModalContext.contents.isShown]);

  return (
    <HomeLayout headerText={'???????????????'} noBtn={true}???title={`covEAT/??????????????? | ${authState.user.name}????????????????????????`}>
      <TopModal/>
      <Modal
        title={modalState.title}
        subtitle={modalState.subtitle}
        btntext={modalState.btntext}
        onClick={modalState.onClick}/>
      
      {loading ? <Loading/> :
        <React.Fragment>
          {showState && <ToggleModal shop_names={shopData?.map((data: any) => data.name)} setShowState={setShowState} showState={showState} selectedShopIndex={selectedShopIndex} onClick={handleSelect}/>}
          {shopData.length !== 0 && shopData[selectedShopIndex] && <OwnerShopCard shop={shopData[selectedShopIndex]} deleteModal={deleteModal} publishModal={publishModal}/>}
        </React.Fragment>
      }
      {shopData.length > 1 ?
        <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.btn} onClick={() => setShowState(true)}>?????????????????????</Button>
        :
        <Text theme={[TextThemes.CAPTION, TextThemes.SUBTITLE]} propStyle={propStyle.registerText}>?????????????????????????????????????????????</Text>
      }
      <Link to={RouteName.OWNER_SHOP_FORM}>
        <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.btn}>?????????????????????</Button>
      </Link>

      <OwnerAccountTopCardList handleModalState={handleModalState} toggleModalShown={modalContext.toggleModalShown}/>
      <PrivacyFotter propStyle={propStyle.privacy}/>
    </HomeLayout>
  );
}

export default OwnerAccountTop;