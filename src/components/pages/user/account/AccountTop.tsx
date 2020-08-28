import React, { useEffect, useState, useContext } from 'react';
import { HomeLayout } from '../../../templates/HomeLayout';
import Button from '../../../atoms/Button';
import Icon, { IconThemes } from '../../../atoms/Icon';
import Text, { TextThemes } from '../../../atoms/Text';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../../context/CommonProvider";
import { AccountTopCardList } from './../../../organisms/AccoutTopCardList';

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

export const AccountTop: React.FC = (props: any) => {
  const { authState, setAuth } = useContext(AuthContext);
  const [account, setAccount] = useState(authState.user);

  return (
    <HomeLayout subHeaderText={'ユーザ情報'} prevRef={'/'} history={props.history}>
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
        <Link to='/accounts/editprofile'>
          <Button propStyle={propStyle.profileCardBtn}>
            <Text theme={[TextThemes.SMALL]} propStyle={propStyle.profileText}> 
              プロフィールを編集
            </Text>
            <ChevronRight size={16} color="#333"/>
          </Button>
        </Link>
      </div>

      <AccountTopCardList history={props.history}/>

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