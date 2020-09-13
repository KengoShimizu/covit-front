import React, { useContext } from 'react';
// library
import { Trash2 } from 'react-feather';
import queryString from 'query-string';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RouteName, RedirectFrom } from '../../../common/Const';
import FooterActionBar from '../../organisms/FooterActionBar';
// components
import HomeLayout from '../../templates/HomeLayout';
import HistoryCardList from '../../organisms/CardList/HistoryCardList';
import Button, { ButtonThemes } from '../../atoms/Button';
import Icon, { IconThemes } from '../../atoms/Icon';
import Modal from '../../molecules/Modal/Modal';
// context
import ModalContext from '../../../context/ModalContext';

const propStyle = {
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    margin: '0 0 24px auto'
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

const History: React.FC = (props: any) => {
  const modalContext = useContext(ModalContext);
  const qs = queryString.parse(props.location.search);

  const handleCookie = () => {
    localStorage.setItem('histories', '');
    localStorage.setItem('histories_date', '');
    window.location.reload();
  }

  return (
    <HomeLayout headerText='閲覧履歴' prevRef={qs.from === RedirectFrom.ACCOUNTS ? RouteName.ACCOUNT_TOP : RouteName.ROOT}>
      <Modal
        title='本当に履歴を削除しますか？'
        btntext='削除する'
        onClick={handleCookie} />
      <div className='container'>
        <div className="delete-btn-container">
          <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.deleteBtn} onClick={localStorage.getItem('histories') ? modalContext.toggleModalShown : () => { }}>
            <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.deleteBtnIcon}><Trash2 size="18" color="#8C8C8C" /></Icon>
            <span className="delete-btn_text">履歴を削除</span>
          </Button>
        </div>
        <HistoryCardList />
        <FooterActionBar initialAccent={3} />
        <style jsx>{`
          .container{
            width: 100%;
            min-height: calc(100vh - 40px);
            background-color: ${CommonStyle.BgGray};
            padding: 8px 0 100px;
          }
          .delete-btn-container{
            max-width: 700px;
            margin: 0 auto;
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

export default History;