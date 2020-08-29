import React, { useState, useContext } from 'react';
// library
import { Edit, Mail, LogOut, Trash2 } from 'react-feather';
import axios from "axios";
import Cookies from 'universal-cookie';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import AccountTopCard from '../../molecules/Card/AccoutTopCard';
import Modal from '../../molecules/Modal/Modal';
// context
import { ModalTopContextIsShown, ModalTopContextText } from '../../../context/ModalTopContext';
import ModalContext from '../../../context/ModalContext';
// image
import HistoryIcon from './../../../img/history_black.svg';



interface AccoutTopCardListProps {
  history: any;
}

export const AccountTopCardList: React.FC<AccoutTopCardListProps> = ({history}) => {
  const cookies = new Cookies();
  const modalTop_isShownContext = useContext(ModalTopContextIsShown);
  const modalTop_textContext = useContext(ModalTopContextText);
  const modalContext = useContext(ModalContext);
  const [modalState, setModalState] = useState({
    title: '',
    subtitle: '',
    btntext: '',
    onClick: () => {}
  });

  const handleLogout = (toggleModalTopShown: any, setModalText: any) => {
    axios.post(`/api/v1/common/sessions/logout?token=${cookies.get('token')}`)
      .then(() => {
        setModalText({
          caption: 'ログアウトしました。'
        });
        toggleModalTopShown(true);
        history.push('/');
      }).catch(() => {
        setModalText({
          caption: 'ログアウトに失敗しました。'
        });
        toggleModalTopShown(true);
        history.push('/');
      })
  }
  const handleDeleteAccount = (toggleModalTopShown: any, setModalText: any) => {
    axios.delete(`/api/v1/user/users/1`)
      .then(() => {
        setModalText({
          caption: 'アカウントの削除が完了しました。', 
          small: '今までご利用ありがとうございました！'
        });
        toggleModalTopShown(true);
        history.push('/');
      }).catch(() => {
        setModalText({
          caption: 'アカウントの削除に失敗しました。'
        });
        toggleModalTopShown(true);
        history.push('/');
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
      onClick: () => handleLogout(modalTop_isShownContext.setIsModalTopShown, modalTop_textContext.setModalText)
    },
    {
      title: '本当にアカウントを削除しますか？',
      subtitle: 'アカウントを削除すると、レビューなどの情報が全て削除され復元はできません。',
      btntext: '削除する',
      onClick: () => handleDeleteAccount(modalTop_isShownContext.setIsModalTopShown, modalTop_textContext.setModalText)
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
        <AccountTopCard src={HistoryIcon} text='閲覧履歴' nextRef='/history'/>
        <AccountTopCard text='レビューしたお店' nextRef='/accounts/comments'>
          <Edit size={20} color="#333" />
        </AccountTopCard>
        <hr className="account-function_hr" />
        <AccountTopCard text='ログイン情報の編集' nextRef='/accounts/editlogin'>
          <Mail size={20} color="#333" />
        </AccountTopCard>
        <hr className="account-function_hr" />
        <div onClick={() => handleModalState(0, modalContext.toggleModalShown)}>
          <AccountTopCard text='ログアウト'>
            <LogOut size={20} color="#333"/>
          </AccountTopCard>
        </div>
        <div onClick={() => handleModalState(1, modalContext.toggleModalShown)}>
          <AccountTopCard text='アカウントを削除する'>
            <Trash2 size={20} color="#333" />
          </AccountTopCard>
        </div>

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