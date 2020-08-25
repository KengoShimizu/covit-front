import React, { useEffect, useState } from 'react';
import { CommonStyle } from './../../../common/CommonStyle';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../templates/HomeLayout';
import { SubHeader } from './../../molecules/SubHeader';
import Button, { ButtonThemes } from './../../atoms/Button';
import Icon, { IconThemes } from './../../atoms/Icon';
import Title, { TitleThemes } from './../../atoms/Title';
import Text, { TextThemes } from './../../atoms/Text';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Airing from './../../../img/covid-icon_airing.svg';
import axios from "axios";
import useReactRouter from "use-react-router";

const propStyle = {
  profileCardBtn: {
    width: '44px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

interface UserParams {
  email: string,
  image: string,
  name: string
}

export const AccountTop: React.FC = () => {
  const { match }: any = useReactRouter();
  const [err, setErr] = useState("");
  const [account, setAccount] = useState<UserParams>({
    email: '',
    image: '',
    name: ''
  });

  const fetchAccountInfo = () => {
    axios.get(`/api/v1/user/users/${match.params.id}`)
      .then(res => setAccount(res.data))
      .catch(err => setErr(err.response.data.errors[0]));
  }

  //useEffect(() => {
  //  console.log(account)
  //}, [account])

  useEffect(() => {
    fetchAccountInfo();
  }, [])
  return (
    <HomeLayout>
      <div className="">
        <SubHeader>
          <Link to='/'>
            <Button theme={[ButtonThemes.SUBHEADER]}>
              <ChevronLeft size={24} color="#333" />
            </Button>
          </Link>
          <Title theme={[TitleThemes.SUBHEADER]}>
            ユーザ情報
          </Title>
        </SubHeader>

        <div className="profile-card">
          <div className="profile-card-icon-name">
            <Icon theme={[IconThemes.NORMAL]}>
              <img className="infection-control_icon" src={Airing} alt=""/>
            </Icon>
            <Text theme={[TextThemes.CAPTION]}> 
              {account.name}
            </Text>
          </div>
          <div className="profile-card-edit">
            <Text theme={[TextThemes.CAPTION]}> 
              プロフィールを編集
            </Text>
            
          </div>
          <Button propStyle={propStyle.profileCardBtn}>
            <ChevronRight size={24} color="#333"/>
          </Button>
        </div>

        <Link to='/history'>閲覧履歴</Link>
        <br />
        <Link to='/accounts/:id/editlogin'>ログイン情報の編集</Link>
        <br />
        <Link to='/accounts/logout'>Logout</Link>
        <br />
        <Link to='/accounts/privacy'>Privacy</Link>
        <br />
        <Link to='/accounts/:id/delete'>Delete</Link>
      </div>
      <style jsx>{`
        .infection-control_icon{
          width: 32px;
          height: auto;
        }
        .profile-card{
          display: flex;
          width: 100%;
          padding: 12px 0px 12px 15px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        .profile-card-icon-name{
          display: flex;
          width: calc(100% - 190px);
          margin-right: 16px;
        }
      `}</style>
    </HomeLayout>
  );
}