import React, { useState, useEffect } from 'react';
// library
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from '@material-ui/core';
import { Smile, Frown } from 'react-feather';
import useReactRouter from "use-react-router";
import axios from 'axios';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import ShopCommentCard from '../../molecules/Card/ShopCommentCard';
import UserCommentCard from '../../molecules/Card/UserCommentCard';
import Icon, { IconThemes } from '../../atoms/Icon';

const propStyle = {
  reviewIcon: {
    marginRight: '4px',
  },
  isShopPage: {
    padding: '50px 20px 0',
  },
  isUserPage: {
    padding: '35px 0 1px',
    backgroundColor: CommonStyle.BgGray,
  }
};

interface CommentsCardListProps {
  sqlQuery: string;
}

const CommentsCardList: React.FC<CommentsCardListProps> = ({sqlQuery}) => {
  const { match }: any = useReactRouter();
  const isShopPage = match.path.match(/shops/g);
  const isCurrentUser = match.path.match(/accounts/g);
  const [state, setState] = useState('good');
  const [showLoader, setShowLoader] = useState(false);
  const [goodReputations, setGoodReputations] = useState([]);
  const [badReputations, setBadReputations] = useState([]);
  const [pagenationForGood, setPagenationForGood] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });

  const [pagenationForBad, setPagenationForBad] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1
  });

  const fetchGoodData = async () => {
    let response = await axios
      .get(`/api/v1/user/comments?page=${1}&limit=${10}&reputation=1&${sqlQuery}`)
      .then(result => result.data)
      .catch(error => console.log(error));

    setGoodReputations(response.data);
    setPagenationForGood({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
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

  const fetchBadData = async () => {
    let response = await axios
      .get(`/api/v1/user/comments?page=${1}&limit=${10}&reputation=2&${sqlQuery}`)
      .then(result => result.data)
      .catch(error => console.log(error));

    setBadReputations(response.data);
    setPagenationForBad({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }

  const fetchMoreBadData = async () => {
    setShowLoader(true);
    let response = await axios
      .get(`/api/v1/user/comments?page=${pagenationForBad.currentPage + 1}&limit=${pagenationForBad.perPage}&reputation=1&${sqlQuery}`)
      .then(result => result.data)
      .catch(error => console.log(error))
      .finally(() => setShowLoader(false));

    setBadReputations(badReputations.concat(response.data));
    setPagenationForBad({
      total: response.meta.total,
      perPage: response.meta.perPage,
      currentPage: response.meta.currentPage
    });
  }


  useEffect(() => {
    fetchGoodData();
    fetchBadData();
  }, [])


  return (
    <div className='container'>
        <div className="content">
          <div className="review-switch_container">
            <div className="review-switch" style={{ borderBottom: "solid", borderBottomColor: state === 'good' ? "#ED753A" : "#B6B2AA", borderBottomWidth: "4px" }} onClick={() => setState('good')}>
              <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.reviewIcon}>
              <Smile className="review-icon_unselected" size={24} color="#ED753A" />
              </Icon>
              <p className="review-switch_num" style={{ color: "#ED753A" }}>{pagenationForGood.total}</p>
            </div>
            <div className="review-switch" style={{ borderBottom: "solid", borderBottomColor: state === 'bad' ? "#3A8CED" : "#B6B2AA", borderBottomWidth: "4px" }} onClick={() => setState('bad')}>
            <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.reviewIcon}>
              <Frown className="review-icon_unselected" size={24} color="#3A8CED" />
              </Icon>
              <p className="review-switch_num" style={{ color: "#3A8CED" }}>{pagenationForBad.total}</p>
            </div>
            {/* FIXME 非選択時アイコンと数字も色かわる*/}
            {/* 選択中じゃない時は#B6B2AA */}
          </div>
          <InfiniteScroll
            element='ol'
            className="review-list"
            pageStart={1}
            hasMore={!showLoader && (state === 'good' ? pagenationForGood.total > goodReputations.length : pagenationForBad.total > badReputations.length)}
            loadMore={state === 'good' ? fetchMoreGoodData : fetchMoreBadData}
            initialLoad={false}
            style={isShopPage ? propStyle.isShopPage : propStyle.isUserPage}
          >
            {
              (state === 'good' ? goodReputations : badReputations).map((comment: any) => {
                const icon = state === 'good' ? 'smile' : 'frown';
                return (
                  isShopPage ?
                    <ShopCommentCard comment={comment} key={comment.id} />
                    :
                    <UserCommentCard icon={icon} comment={comment} key={comment.id} isCurrentUser={isCurrentUser}/>
                );
              })
            }
          </InfiniteScroll>
          {showLoader &&
            <div style={{ textAlign: "center", paddingBottom: "10px" }}>
              <CircularProgress style={{ margin: "24px auto" }}/>
            </div>
          }
        </div>
        <style jsx>{`
          .container{
            width: 100%
          }
          .review-switch_container{
            width: 100%;
            display: flex;
            position: fixed;
            background-color: ${CommonStyle.BgWhite}
          }
          .review-switch{
            width: 50%;
            display: flex;
            align-items:center;
            justify-content: center;
            padding-bottom: 6px;
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