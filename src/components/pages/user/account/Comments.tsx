import React, { useState, useContext, useEffect } from 'react';
// library
import useReactRouter from "use-react-router";
import axios from 'axios';
// components
import HomeLayout from '../../../templates/HomeLayout';
import ProfileIconNameCard from './../../../molecules/Card/ProfileIconNameCard';
import CommentsCardList from '../../../organisms/CardList/CommentsCardList';
// context
import AuthContext from './../../../../context/CommonProvider';
import CommonStyle from '../../../../common/CommonStyle';
// common
import { RouteName } from '../../../../common/Const';

export const Comments: React.FC = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { authState } = useContext(AuthContext);
  const { match }: any = useReactRouter();
  const user_id = match.params.id ? match.params.id : authState.user.id;
  const [pageState, setPageState] = useState({
    headerText: '',
    prevRef: '#',
    sqlQuery: 'user_id=0',
    update: false
  });
  const [user, setUser] = useState({
    id: 0,
    image: '',
    name: '',
  });


  const fetchUserData = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/user/users/${user_id}`);
      if (isSubscribed) setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (match.params.id) {
      let isSubscribed = true;
      setLoading(true);
      fetchUserData(isSubscribed);
      setLoading(false);
      const cleanup = () => {
        isSubscribed = false;
      };
      return cleanup;
    }
  }, [])

  useEffect(() => {
    match.params.id ?
      setPageState({
        headerText: `${user.name} さんのレビュー一覧`,
        prevRef: '#',
        sqlQuery: `user_id=${user_id}`,
        update: true
      }) :
      setPageState({
        headerText: 'レビューしたお店',
        prevRef: RouteName.ACCOUNT_TOP,
        sqlQuery: `user_id=${user_id}`,
        update: true
      });
  }, [user])

  return (
    <HomeLayout headerText={pageState.headerText} prevRef={pageState.prevRef} history={props.history}>
      {loading ? <div></div> :
      <div>
        {match.params.id && user &&
          <div className="profile-card">
            <ProfileIconNameCard src={user.image} name={user.name} />
          </div>
        }
        {pageState.update &&
          <div className="comment-card-list">
            <CommentsCardList sqlQuery={pageState.sqlQuery} />
          </div>
        }
      </div>}
      <style jsx>{`
        .profile-card{
          position: fixed;
          width: 100%;
          background-color: ${CommonStyle.BgWhite};
        }
        .comment-card-list{
          ${match.params.id && 'padding-top: 100px;'}
        }
      `}</style>
    </HomeLayout>
  );
}