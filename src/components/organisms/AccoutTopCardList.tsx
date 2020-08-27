import React from 'react';
import { CommonStyle } from './../../common/CommonStyle';
import { AccountTopCard } from './../molecules/AccoutTopCard';
import HistoryIcon from './../../img/history_black.svg';
import { Edit, Mail, LogOut, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';

interface AccoutTopCardListProps {
}

export const AccountTopCardList: React.FC<AccoutTopCardListProps> = ({}) => {

  return (
    <div className="container">
      <ul className="account-function_list">
        <Link to='/history'>
          <li className="account-function_option">
            <AccountTopCard src={HistoryIcon} text='閲覧履歴'/>
          </li>
        </Link>
        <Link to='/history'>
          <li className="account-function_option">
            <AccountTopCard text='レビューしてお店'>
              <Edit size={20} color="#333" />
            </AccountTopCard>
          </li>
        </Link>
        <hr className="account-function_hr" />
        <Link to='/accounts/editlogin'>
          <li className="account-function_option">
            <AccountTopCard text='ログイン情報の編集'>
              <Mail size={20} color="#333" />
            </AccountTopCard>
          </li>
        </Link>
        <hr className="account-function_hr" />
        <Link to='/history'>
          <li className="account-function_option">
            <AccountTopCard text='ログアウト'>
              <LogOut size={20} color="#333" />
            </AccountTopCard>
          </li>
        </Link>
        <Link to='/history'>
          <li className="account-function_option">
            <AccountTopCard text='アカウントを削除する'>
              <Trash2 size={20} color="#333" />
            </AccountTopCard>
          </li>
        </Link>
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
        .account-function_option{
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}