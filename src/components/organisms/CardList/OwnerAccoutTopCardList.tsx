import React from 'react';
// library
import { Mail, LogOut, Trash2, HelpCircle, User } from 'react-feather';
// common
import CommonStyle from '../../../common/CommonStyle';
import { RouteName } from './../../../common/Const';
// components
import AccountTopCard from '../../molecules/Card/AccoutTopCard';

interface OwnerAccoutTopCardListProps {
  handleModalState: any;
  toggleModalShown: number;
}

const OwnerAccountTopCardList: React.FC<OwnerAccoutTopCardListProps> = ({ handleModalState, toggleModalShown }) => {
  return (
    <div className="container">
      <ul className="account-function_list">
        <hr className="account-function_hr" />
        {/* FIXME 導線 */}
        <AccountTopCard icon={<User size={20} color={CommonStyle.AccentColor} />} text='プロフィール' nextRef={RouteName.OWNER_EDIT_PROFILE}/>
        <AccountTopCard icon={<Mail size={20} color={CommonStyle.AccentColor} />} text='メールアドレス' nextRef={RouteName.EDIT_EMAIL}/>
        <AccountTopCard icon={<LogOut size={20} color={CommonStyle.AccentColor} />} text='ログアウト' onClick={() => handleModalState(0, toggleModalShown)} />
        <AccountTopCard icon={<Trash2 size={20} color={CommonStyle.AccentColor} />} text='アカウントを削除する' onClick={() => handleModalState(1, toggleModalShown)} />
        <hr className="account-function_hr" />
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor} />} text='covEATについて' nextRef={RouteName.LANDING_PAGE} />
      </ul>
      <style jsx>{`
        .account-function_list{
          padding: 0 16px;
          margin: 40px 0;
        }
        .account-function_hr{
          height: 8px;
          margin: 0 0 12px -16px;
          background: ${CommonStyle.BgGray};
          border-top: 1px solid ${CommonStyle.BgGray};
          width: calc(100% + 32px);
        }
      `}</style>
    </div>
  );
}

export default OwnerAccountTopCardList;