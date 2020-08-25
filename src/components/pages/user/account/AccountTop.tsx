import React, { useEffect, useState, useContext } from 'react';
import {CommonStyle} from '../../../../common/CommonStyle';
import { HomeLayout } from '../../../templates/HomeLayout';
import Button, { ButtonThemes } from '../../../atoms/Button';
import HistoryIcon from './../../../../img/history_black.svg';
import Icon, { IconThemes } from '../../../atoms/Icon';
import Text, { TextThemes } from '../../../atoms/Text';
import { ChevronRight, Edit, Mail, LogOut, Trash2 } from 'react-feather';
import { FlexCard } from '../../../molecules/FlexCard';
import { AuthContext } from "../../../../context/CommonProvider";

const propStyle = {
  profileCardBtn: {
    display: 'flex',
    alignItems: 'center'
  },
  profileText: {
    marginRight: '8px'
  },
  accountIcon: {
    marginRight: '8px'
  }
}

export const AccountTop: React.FC = () => {
  const { authState, setAuth } = useContext(AuthContext);
  const [account, setAccount] = useState(authState.user);

  useEffect(() => {
    console.log(account);
  }, [])

  return (
    <HomeLayout subHeaderText={'ユーザ情報'} prevRef={'/'}>
      <div className="account-info_card">
        <div className="account-info_profile">
          {/* FIXME IconThemes.COVIDMEASURE*/}
          <Icon theme={[IconThemes.PROFILE]} propStyle={propStyle.accountIcon}>
            <img className="account-info_profile-icon" src={account.image} alt=""/>
          </Icon>
          <Text theme={[TextThemes.CAPTION]}> 
            {account.name}
          </Text>
        </div>
        <Button propStyle={propStyle.profileCardBtn}>
          <Text theme={[TextThemes.SMALL]} propStyle={propStyle.profileText}> 
            プロフィールを編集
          </Text>
          <ChevronRight size={16} color="#333"/>
        </Button>
      </div>

      <ul className="account-function_list">
        <li className="account-function_option">
          <Icon theme={[IconThemes.LERGE]}><img className="account-function_img" src={HistoryIcon} alt=""/></Icon>
          <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.profileText}> 
            閲覧履歴
          </Text>
        </li>
        <li className="account-function_option">
          <Icon theme={[IconThemes.LERGE]}><Edit size={20} color="#333" /></Icon>
          <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.profileText}> 
            レビューしたお店
          </Text>
        </li>
        <hr className="account-function_hr" />
        <li className="account-function_option">
          <Icon theme={[IconThemes.LERGE]}><Mail size={20} color="#333" /></Icon>
          <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.profileText}> 
            ログイン情報の編集
          </Text>
        </li>
        <hr className="account-function_hr" />
        <li className="account-function_option">
          <Icon theme={[IconThemes.LERGE]}><LogOut size={20} color="#333" /></Icon>
          <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.profileText}> 
            ログアウト
          </Text>
        </li>
        <li className="account-function_option">
          <Icon theme={[IconThemes.LERGE]}><Trash2 size={20} color="#333" /></Icon>
          <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.profileText}> 
            アカウントを削除する
          </Text>
        </li>
      </ul>
      <ul className="privacy_container">
        <li className="privacy_text">プライバシー</li>
        <li className="privacy_text">サービス名 © ︎2020</li>
      </ul>
      <style jsx>{`
        .account-info_card{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px;
          margin-bottom: 40px;
        }
        .account-info_profile{
          display: flex;
          align-items: center;
        }
        .account-info_profile-icon{
          width: 100%;
          height: 100%;
        }
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
        .account-function_img{
          width: 100%;
          height: auto;
        }

        //プライバシー
        .privacy_container{
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 48px;
          top: auto;
        }
        .privacy_text{
          font-weight: bold;
          font-size: 14px;
          color: #8C8C8C;
          margin-bottom: 12px;
        }
      `}</style>
    </HomeLayout>
  );
}