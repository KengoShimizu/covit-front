import React, { useState, useContext } from 'react';
// library
import { Edit, Mail, LogOut, Trash2, HelpCircle, AlertCircle } from 'react-feather';
import axios from "axios";
import Cookies from 'universal-cookie';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RouteName } from './../../../common/Const';
// components
import AccountTopCard from '../../molecules/Card/AccoutTopCard';
import Modal from '../../molecules/Modal/Modal';
// context
import TopModalContext from '../../../context/TopModalContext';
import ModalContext from '../../../context/ModalContext';
import AuthContext from "../../../context/CommonProvider";


interface AccoutTopCardListProps {
  history: any;
  user_id: number;
}

export const AccountTopCardList: React.FC<AccoutTopCardListProps> = ({ history, user_id }) => {
  const cookies = new Cookies();
  const { setAuth } = useContext(AuthContext);
  const topModalContext = useContext(TopModalContext);
  const modalContext = useContext(ModalContext);
  const [modalState, setModalState] = useState({
    title: '',
    subtitle: '',
    btntext: '',
    onClick: () => { }
  });

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


  return (
    <div className="container">
      <Modal
        title={modalState.title}
        subtitle={modalState.subtitle}
        btntext={modalState.btntext}
        onClick={modalState.onClick} />
      <ul className="account-function_list">
        <AccountTopCard src='/history_accent.svg' text='閲覧履歴' nextRef={RouteName.HISTORY} />
        <AccountTopCard icon={<Edit size={20} color={CommonStyle.AccentColor} />} text='レビューしたお店' nextRef={RouteName.SELF_COMMENTS} />
        <hr className="account-function_hr" />
        <AccountTopCard icon={<Mail size={20} color={CommonStyle.AccentColor} />} text='ログイン情報の編集' nextRef={RouteName.EDIT_LOGIN} />
        <hr className="account-function_hr" />
        <AccountTopCard icon={<LogOut size={20} color={CommonStyle.AccentColor} />} text='ログアウト' onClick={() => handleModalState(0, modalContext.toggleModalShown)}/>
        <AccountTopCard icon={<Trash2 size={20} color={CommonStyle.AccentColor} />} text='アカウントを削除する' onClick={() => handleModalState(1, modalContext.toggleModalShown)}/>
        <hr className="account-function_hr" />
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor} />} text='covEATについて' nextRef={RouteName.LANDING_PAGE} />
        <AccountTopCard icon={<AlertCircle size={20} color={CommonStyle.AccentColor} />} text='口コミ投稿のガイドライン' nextRef={RouteName.GUIDE_LINE} />
      </ul>
      <style jsx>{`
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
      `}</style>
    </div>
  );
}