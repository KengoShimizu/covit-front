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
import { TopModalContextIsShown, TopModalContextText } from '../../../context/TopModalContext';
import ModalContext from '../../../context/ModalContext';



interface AccoutTopCardListProps {
  history: any;
}

export const AccountTopCardList: React.FC<AccoutTopCardListProps> = ({history}) => {
  const cookies = new Cookies();
  const TopModal_isShownContext = useContext(TopModalContextIsShown);
  const TopModal_textContext = useContext(TopModalContextText);
  const modalContext = useContext(ModalContext);
  const [modalState, setModalState] = useState({
    title: '',
    subtitle: '',
    btntext: '',
    onClick: () => {}
  });

  const handleLogout = (toggleTopModalShown: any, setModalText: any) => {
    axios.post(`/api/v1/common/sessions/logout?token=${cookies.get('token')}`)
      .then(() => {
        setModalText({
          caption: 'ログアウトしました。'
        });
        toggleTopModalShown(true);
        history.push(RouteName.ROOT);
      }).catch(() => {
        setModalText({
          caption: 'ログアウトに失敗しました。'
        });
        toggleTopModalShown(true);
        history.push(RouteName.ROOT);
      })
  }
  const handleDeleteAccount = (toggleTopModalShown: any, setModalText: any) => {
    axios.delete(`/api/v1/user/users/1`)
      .then(() => {
        setModalText({
          caption: 'アカウントの削除が完了しました。', 
          small: '今までご利用ありがとうございました！'
        });
        toggleTopModalShown(true);
        history.push(RouteName.ROOT);
      }).catch(() => {
        setModalText({
          caption: 'アカウントの削除に失敗しました。'
        });
        toggleTopModalShown(true);
        history.push(RouteName.ROOT);
      })
  }

  const handleModalState = (i: number, toggleModalShown: any) => {
    setModalState(states[i]);
    toggleModalShown(true);
  }

  const states = [
    {
      title: 'ログアウトしてよろしいですか？',
      subtitle: '',
      btntext: 'ログアウト',
      onClick: () => handleLogout(TopModal_isShownContext.setIsTopModalShown, TopModal_textContext.setModalText)
    },
    {
      title: '本当にアカウントを削除しますか？',
      subtitle: 'アカウントを削除すると、レビューなどの情報が全て削除され復元はできません。',
      btntext: '削除する',
      onClick: () => handleDeleteAccount(TopModal_isShownContext.setIsTopModalShown, TopModal_textContext.setModalText)
    }
  ];

  return (
    <div className="container">
      <Modal 
        title={modalState.title}
        subtitle={modalState.subtitle}
        btntext={modalState.btntext}
        onClick={modalState.onClick}/>
      <ul className="account-function_list">
        <AccountTopCard src='/history_accent.svg' text='閲覧履歴' nextRef={RouteName.HISTORY}/>
        <AccountTopCard icon={<Edit size={20} color={CommonStyle.AccentColor} />} text='レビューしたお店' nextRef={RouteName.SELF_COMMENTS}/>
        <hr className="account-function_hr" />
        <AccountTopCard icon={<Mail size={20} color={CommonStyle.AccentColor} />} text='ログイン情報の編集' nextRef={RouteName.EDIT_LOGIN}/>
        <hr className="account-function_hr" />
        <div onClick={() => handleModalState(0, modalContext.toggleModalShown)}>
          <AccountTopCard icon={<LogOut size={20} color={CommonStyle.AccentColor}/>} text='ログアウト'/>
        </div>
        <div onClick={() => handleModalState(1, modalContext.toggleModalShown)}>
          <AccountTopCard icon={<Trash2 size={20} color={CommonStyle.AccentColor} />} text='アカウントを削除する'/> 
        </div>
        <hr className="account-function_hr" />
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor}/>} text='covEATについて' nextRef={RouteName.LANDING_PAGE}/>
        <AccountTopCard icon={<AlertCircle size={20} color={CommonStyle.AccentColor}/>} text='口コミ投稿のガイドライン'/>
      </ul>
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