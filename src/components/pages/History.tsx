import React, { useContext } from 'react';
// library
import { Trash2 } from 'react-feather';
import Cookies from 'universal-cookie';
// common
import CommonStyle from './../../common/CommonStyle';
// components
import HomeLayout from '../templates/HomeLayout';
import HistoryCardList from '../organisms/CardList/HistoryCardList';
import Button, { ButtonThemes } from './../atoms/Button';
import Icon, { IconThemes } from './../atoms/Icon';
import Modal from '../molecules/Modal/Modal';
// context
import ModalContext from './../../context/ModalContext';

const propStyle = {
  deleteBtn: {
    marginRight: '24px',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    marginBottom: '20px',
  },
  deleteBtnIcon: {
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fill: CommonStyle.TextDarkGary,
  }
}

export const History: React.FC = (props: any) => {
    const cookies = new Cookies();

    const handleCookie = () => {
      cookies.set('histories', '');
      cookies.set('histories_date', '');
    }

    return (
      <HomeLayout subHeaderText='閲覧履歴' prevRef='#' history={props.history}>
        <Modal 
          title='本当に履歴を削除しますか？'
          btntext='削除する'
          onClick={handleCookie}/>
        <div className='container'>
          <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.deleteBtn} onClick={useContext(ModalContext).toggleModalShown}>
            <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.deleteBtnIcon}><Trash2 size="18" color="#8C8C8C" /></Icon>
            <span className="delete-btn_text">履歴を削除</span>
          </Button>
          <HistoryCardList/>
        <style jsx>{`
          .container{
            width: 100%;
            min-height: 100vh;
            background-color: ${CommonStyle.BgGray};
            padding-top: 8px;
          }
          .delete-btn_text{
            color: ${CommonStyle.TextDarkGary};
            font-size: 16px;
            line-height: 13px;
          }
        `}</style>
        </div>
      </HomeLayout>
    );

}