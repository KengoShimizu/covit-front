import React, { useState, useContext, useEffect } from 'react';
// library
import { Edit, Mail, LogOut, Trash2, HelpCircle, AlertCircle } from 'react-feather';
import axios from "axios";
import Cookies from 'universal-cookie';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RouteName, RedirectFrom } from './../../../common/Const';
// components
import AccountTopCard from '../../molecules/Card/AccoutTopCard';
import Modal from '../../molecules/Modal/Modal';
import Text, { TextThemes } from './../../atoms/Text';
import Icon, { IconThemes } from './../../atoms/Icon';
// context
import TopModalContext from '../../../context/TopModalContext';
import ModalContext from '../../../context/ModalContext';
import AuthContext from "../../../context/CommonProvider";
import RedirectContext from './../../../context/RedirectContext';


interface AccoutTopCardListProps {
  history: any;
  user_id: number;
}

export const AccountTopCardList: React.FC<AccoutTopCardListProps> = ({ history, user_id }) => {
  const cookies = new Cookies();
  const { setUri } = useContext(RedirectContext);
  const { authState, setAuth } = useContext(AuthContext);
  const [loginWay, setLoginWay] = useState('');
  const topModalContext = useContext(TopModalContext);
  const modalContext = useContext(ModalContext);
  const [modalState, setModalState] = useState({
    title: '',
    subtitle: '',
    btntext: '',
    onClick: () => { }
  });

  useEffect(() => {
    authState.user.authorizations.length === 0 ? 
      setLoginWay('email')
      : authState.user.authorizations[0].provider === 'google_oauth2' ?
        setLoginWay('google')
        : authState.user.authorizations[0].provider === 'twitter' ?
          setLoginWay('twitter')
          : setLoginWay('facebook')
  }, [authState])

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
            caption: 'ログアウトしました。'
          }
        });
        document.body.removeAttribute('style');
        history.push(RouteName.ROOT);
      }).catch(() => {
        setContents({
          isShown: true,
          text: {
            caption: 'ログアウトに失敗しました。'
          }
        });
        document.body.removeAttribute('style');
        history.push(RouteName.ROOT);
      })
  }
  const handleDeleteAccount = (setContents: any) => {
    document.body.setAttribute('style', 'pointer-events: none; overflow: hidden;')
    axios.delete(`/api/v1/user/users/${user_id}`)
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
            caption: 'アカウントの削除が完了しました。',
            small: '今までご利用ありがとうございました！'
          }
        });
        document.body.removeAttribute('style');
        history.push(RouteName.ROOT);
      }).catch(() => {
        setContents({
          isShown: true,
          text: {
            caption: 'アカウントの削除に失敗しました。'
          }
        });
        document.body.removeAttribute('style');
        history.push(RouteName.ROOT);
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

  const handleClick = () => {
    setUri({
      fromPath: RedirectFrom.ACCOUNTS,
      shop: 0,
    });
  }

  return (
    <div className="container">
      <Modal
        title={modalState.title}
        subtitle={modalState.subtitle}
        btntext={modalState.btntext}
        onClick={modalState.onClick} />
      <ul className="account-function_list">
        <AccountTopCard src='/history_accent.svg' text='閲覧履歴' onClick={handleClick} />
        {/* コメント・評価 削除 */}
        {/* <AccountTopCard icon={<Edit size={20} color={CommonStyle.AccentColor} />} text='レビューしたお店' nextRef={RouteName.SELF_COMMENTS} /> */}
        <hr className="account-function_hr" />
        {loginWay === 'email' ?
          <React.Fragment>
            <AccountTopCard icon={<Mail size={20} color={CommonStyle.AccentColor} />} text='メールアドレスの変更' nextRef={RouteName.EDIT_EMAIL} />
            <hr className="account-function_hr" />
          </React.Fragment>
          :
          <div className="sns-info-card">
            <Text theme={[TextThemes.CAPTION]}>登録アカウント</Text>
            <div className="sns-info-card-content">
              <div className="sns-info-card-left">
                <Icon theme={[IconThemes.SMALL]} propStyle={{margin: 'auto 16px auto auto'}}>
                  <img className="sns-info-card-img" src={`/${loginWay}.png`} alt={loginWay} />
                </Icon>
                <Text theme={[TextThemes.CAPTION]} propStyle={{margin: 'auto'}}>
                  {loginWay.substr(0,1).toUpperCase() + loginWay.slice(1)}
                </Text>
              </div>
              <Text theme={[TextThemes.CAPTION]} propStyle={{color: CommonStyle.TextDarkGary}}>
                {authState.user.email}
              </Text>
            </div>
          </div>
        }
        <AccountTopCard icon={<LogOut size={20} color={CommonStyle.AccentColor} />} text='ログアウト' onClick={() => handleModalState(0, modalContext.toggleModalShown)}/>
        <AccountTopCard icon={<Trash2 size={20} color={CommonStyle.AccentColor} />} text='アカウントを削除する' onClick={() => handleModalState(1, modalContext.toggleModalShown)}/>
        <hr className="account-function_hr" />
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor} />} text='covEATについて' nextRef={RouteName.LANDING_PAGE} />
        {/* コメント・評価 削除 */}
        {/* <AccountTopCard icon={<AlertCircle size={20} color={CommonStyle.AccentColor} />} text='口コミ投稿のガイドライン' nextRef={RouteName.GUIDE_LINE} /> */}
      </ul>
      <style jsx>{`
        .container{
          margin-bottom: 60px;
        }
        .account-function_list{
          padding: 0 16px;
          max-width: 400px;
          margin: 0 auto;
        }
        .account-function_hr{
          height: 2px;
          margin: 0 0 12px 0;
          background: ${CommonStyle.BgGray}
        }
        .sns-info-card{
          padding: 8px;
        }
        .sns-info-card-content{
          display: flex;
          alignf-items: center;
          padding: 8px 0;
        }
        .sns-info-card-img{
          width: 100%;
          height: auto;
        }
        .sns-info-card-left{
          display: flex;
          margin-right: 16px;
        }
      `}</style>
    </div>
  );
}