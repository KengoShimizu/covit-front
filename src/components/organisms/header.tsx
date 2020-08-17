import React from 'react';
import HistoryIcon from './img/history.svg'

export const ShopModal: React.FC = () => {
  return (
    <header className="header">
      <img className="service-logo" src="" alt=""/>
      <ul className="icon-list">
        <li className="icon-list_option">
          <img className="icon-list_img" src="" alt=""/>
          <p className="icon-list_caption">閲覧履歴</p>
        </li>
        <li className="icon-list_option">
          <img className="icon-list_img" src="" alt=""/>
          <p className="icon-list_caption">ログイン</p>
        </li>
        <li className="icon-list_option">
          <img className="icon-list_img" src={HistoryIcon} alt=""/>
        </li>
      </ul>
      <style jsx>{`
        .container {
        }
        .header{

        }
      `}</style>
    </header>
  );
}

