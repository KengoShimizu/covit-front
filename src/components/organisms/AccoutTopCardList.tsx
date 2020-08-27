import React from 'react';
import { CommonStyle } from './../../common/CommonStyle';
import { AccountTopCard } from '../molecules/Card/AccoutTopCard';
import HistoryIcon from './../../img/history_black.svg';
import { Edit, Mail, LogOut, Trash2 } from 'react-feather';

interface AccoutTopCardListProps {
}

export const AccountTopCardList: React.FC<AccoutTopCardListProps> = ({}) => {

  return (
    <div className="container">
      <ul className="account-function_list">
        <AccountTopCard src={HistoryIcon} text='閲覧履歴' nextRef='/history'/>
        <AccountTopCard text='レビューしたお店' nextRef='/history'>
          <Edit size={20} color="#333" />
        </AccountTopCard>
        <hr className="account-function_hr" />
        <AccountTopCard text='ログイン情報の編集' nextRef='/accounts/editlogin'>
          <Mail size={20} color="#333" />
        </AccountTopCard>
        <hr className="account-function_hr" />
        <AccountTopCard text='ログアウト' nextRef='/history'>
          <LogOut size={20} color="#333"/>
        </AccountTopCard>
        <AccountTopCard text='アカウントを削除する' nextRef='/history'>
          <Trash2 size={20} color="#333" />
        </AccountTopCard>
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