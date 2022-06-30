import React, { useState, useEffect, useContext } from 'react';
// library
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from '@material-ui/core';
import { Smile } from 'react-feather';
import useReactRouter from "use-react-router";
import axios from 'axios';
// common
import CommonStyle from '../../../common/CommonStyle';
import { TopModalTime } from './../../../common/Const';
// components
import ShopCommentCard from '../../molecules/Card/ShopCommentCard';
import UserCommentCard from '../../molecules/Card/UserCommentCard';
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';
import Loading from '../../molecules/Loading';
import Modal from '../../molecules/Modal/Modal';
import TopModal from '../../molecules/Modal/TopModal';
// context
import ModalContext from '../../../context/ModalContext';
import TopModalContext from '../../../context/TopModalContext';
import AuthContext from "../../../context/CommonProvider";
import { RouteName } from '../../../common/Const';
const propStyle = {
  reviewIcon: {
    marginRight: '4px',
  },
  isShopPage: {
    padding: '64px 20px 0',
  },
  isUserPage: {
    padding: '68px 0 1px',
    backgroundColor: CommonStyle.BgGray,
  }
};

interface CommentsCardListProps {
  sqlQuery: string;
}

const CommentsCardList: React.FC<CommentsCardListProps> = ({ sqlQuery }) => {
  const { match }: any = useReactRouter();
  const [loading, setLoading] = useState(true);
  const [isFetched, setisFetched] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const topModalContext = useContext(TopModalContext);
  const modalContext = useContext(ModalContext);
  const { authState } = useContext(AuthContext);
  const isShopPage = match.path.match(/shops/g);
  const isCurrentUser = match.path.match(/accounts/g);
  const [state, setState] = useState('all');
  const [showLoader, setShowLoader] = useState(false);
  const [allReputations, setAllReputations] = useState([]);
  const [goodReputations, setGoodReputations] = useState([]);
  const [pagenationForAll, setPagenationForAll] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });
  const [pagenationForGood, setPagenationForGood] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });
  const [modalState, setModalState] = useState({
    title: '',
    btntext: '',
    onClick: () => { }
  });

  const fetchAllData = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/user/comments?page=${1}&limit=${10}&${sqlQuery}`);
      if (isSubscribed) {
        setAllReputations(res.data.data);
        setPagenationForAll({
          total: res.data.meta.total,
          perPage: res.data.meta.perPage,
          currentPage: res.data.meta.currentPage
        });
        setisFetched(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMoreData = async () => {
    setShowLoader(true);
    let response = await axios
      .get(`/api/v1/user/comments?page=${pagenationForAll.currentPage + 1}&limit=${pagenationForAll.perPage}&${sqlQuery}`)
      .then(result => result.data)
      .catch(error => console.log(error))
      .finally(() => setShowLoader(false));

    setAllReputations(allReputations.concat(response.data));
    setPagenationForAll({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const fetchGoodData = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/user/comments?page=${1}&limit=${10}&reputation=1&${sqlQuery}`);
      if (isSubscribed) {
        setGoodReputations(res.data.data);
        setPagenationForGood({
          total: res.data.meta.total,
          perPage: res.data.meta.perPage,
          currentPage: res.data.meta.currentPage
        });
        setisFetched(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMoreGoodData = async () => {
    setShowLoader(true);
    let response = await axios
      .get(`/api/v1/user/comments?page=${pagenationForGood.currentPage + 1}&limit=${pagenationForGood.perPage}&reputation=1&${sqlQuery}`)
      .then(result => result.data)
      .catch(error => console.log(error))
      .finally(() => setShowLoader(false));

    setGoodReputations(goodReputations.concat(response.data));
    setPagenationForGood({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const clickReport = (user_id: number, user_name: string) => {
    if (authState.isLogin) {
      setModalState({
        title: `${user_name} さんを報告しますか？`,
        btntext: '報告する',
        onClick: () => report(user_id, '')
      });
      modalContext.toggleModalShown(true);
    } else {
      return window.location.href = RouteName.REGISTER;
    }
  }

  const clickDelete = (comment_id: number) => {
    setModalState({
      title: 'コメントを削除しますか？',
      btntext: '削除する',
      onClick: () => delete_self_comment(comment_id)
    });
    modalContext.toggleModalShown(true);
  }

  const report = async (user_id: number, content: string) => {
    try{
      await axios.post('/api/v1/user/reports', {
          target_user_id: user_id,
          content: content
        })
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'ユーザーを報告しました。',
          small: '運営へのご協力ありがとうございます。'
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const delete_self_comment = async (comment_id: number) => {
    try{
      await axios.delete(`/api/v1/user/comments/${comment_id}`)
      setDeletedId(comment_id)
      topModalContext.setContents({
        isShown: true,
        text: {
          caption: 'コメントを削除しました'
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    fetchAllData(isSubscribed);
    fetchGoodData(isSubscribed);
    setLoading(false);
    const cleanup = () => {
      isSubscribed = false;
    };
    return cleanup;
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state])

  useEffect(() => {
    if (topModalContext.contents.isShown){
      setTimeout(() => {
        topModalContext.setContents({
          isShown: false,
          text: {
            caption: ''
          }
        })
      }, TopModalTime)
    }
  }, [topModalContext.contents.isShown]);

  return (
    <div className='container'>
      {loading ? <Loading/> :
        <div className="content">
          <TopModal/>
          <Modal
            title={modalState.title}
            btntext={modalState.btntext}
            onClick={modalState.onClick} />
          <div className="review-switch_container">
            <div className="review-switch" style={{ borderBottom: "solid", borderBottomColor: state === 'all' ? "#ED753A" : "#B6B2AA", borderBottomWidth: "4px" }} onClick={() => setState('all')}>
              <p className="review-switch_num">コメント一覧</p>
            </div>
            <div className="review-switch" style={{ borderBottom: "solid", borderBottomColor: state === 'good' ? "#ED753A" : "#B6B2AA", borderBottomWidth: "4px" }} onClick={() => setState('good')}>
              <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.reviewIcon}>
                <Smile className="review-icon_unselected" size={24} color="#ED753A" />
              </Icon>
              <p className="review-switch_num" style={{ color: "#ED753A" }}>最高！評価のコメント</p>
            </div>
          </div>
          <InfiniteScroll
            element='ol'
            className="review-list"
            pageStart={1}
            hasMore={!showLoader && (state === 'all' ? pagenationForAll.total > allReputations.length : pagenationForGood.total > goodReputations.length)}
            loadMore={state === 'all' ? fetchMoreData : fetchMoreGoodData}
            initialLoad={false}
            style={isShopPage ? propStyle.isShopPage : isCurrentUser ? propStyle.isUserPage : { padding: '162px 0 1px', backgroundColor: CommonStyle.BgGray,}}
          >
            {
              (state === 'all' ? allReputations : goodReputations)?.map((comment: any) => {
                const icon = comment.reputation === 1 ? 'smile' : '';
                return (
                  isShopPage ?
                    <ShopCommentCard comment={comment} clickReport={clickReport} clickDelete={clickDelete} key={comment.id} deletedId={deletedId} />
                    :
                    <UserCommentCard icon={icon} comment={comment} key={comment.id} isCurrentUser={isCurrentUser} onClick={clickDelete} deletedId={deletedId} nextRef={isCurrentUser ? `/shops/${comment.shop_id}?from=accounts` : '#'}/>
                );
              })
            }
            {isFetched && (state === 'all' ? allReputations : goodReputations).length === 0 &&
              <Text theme={[TextThemes.CAPTION]} propStyle={{ paddingTop: "24px", textAlign: 'center' }}>まだコメントがありません。</Text>
            }
          </InfiniteScroll>
          <div style={{height: '120px'}}/>
          {showLoader &&
            <div style={{ textAlign: "center", paddingBottom: "10px" }}>
              <CircularProgress style={{ margin: "24px auto" }} />
            </div>
          }
        </div>}
      <style jsx>{`
          .container{
            width: 100%;
          }
          .review-switch_container{
            width: 100%;
            max-width: 1000px;
            display: flex;
            background-color: ${CommonStyle.BgWhite};
            padding-top: 1.5rem;
            position: fixed;
            top: ${!isShopPage && !isCurrentUser ? '128px' : ''};
          }
          .review-switch{
            width: 50%;
            display: flex;
            align-items:center;
            justify-content: center;
            padding-bottom: 6px;
            cursor: pointer;
          }
          .review-switch_num{
            font-weight: bold;
            font-size: 12px;
            line-height: 19px;
          }
        `}</style>
    </div>
  );
}

export default CommentsCardList;