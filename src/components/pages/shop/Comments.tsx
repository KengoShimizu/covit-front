import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HistoryIcon from './../../../img/history.svg'
import { CommentCard } from './../../molecules/CommentCard'
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from '@material-ui/core';
import useReactRouter from "use-react-router";
import { HomeLayout } from '../../templates/HomeLayout';

// ショップのコメント一覧
export const ShopComments: React.FC = () => {
  const { match }: any = useReactRouter();
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
      .get(`/api/v1/user/comments?page=${1}&limit=${10}&reputation=1&shop_id=${match.params.id}`)
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
      .get(`/api/v1/user/comments?page=${pagenationForGood.currentPage + 1}&limit=${pagenationForGood.perPage}&reputation=1&shop_id=${match.params.id}`)
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
      .get(`/api/v1/user/comments?page=${1}&limit=${10}&reputation=2&shop_id=${match.params.id}`)
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
      .get(`/api/v1/user/comments?page=${pagenationForBad.currentPage + 1}&limit=${pagenationForBad.perPage}&reputation=1&shop_id=${match.params.id}`)
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
    <HomeLayout>
      <div className='container'>
        <div className="content">
          <div className="sub-header">
            <Link to='/'>
              <div className="sub-header_btn">
                <p>←</p>
              </div>
            </Link>
            <h1 className="sub-header_title">コメント一覧</h1>
          </div>
          <div className="review-switch_container">
            <div className="review-switch" style={{ borderBottom: "solid", borderBottomColor: state === 'good' ? "#ED753A" : "#B6B2AA", borderBottomWidth: "4px" }} onClick={() => setState('good')}>
              <img className="review-switch_img" src={HistoryIcon} alt="" />
              <p className="review-switch_num" style={{ color: "#ED753A" }}>{pagenationForGood.total}</p>
            </div>
            <div className="review-switch" style={{ borderBottom: "solid", borderBottomColor: state === 'bad' ? "#3A8CED" : "#B6B2AA", borderBottomWidth: "4px" }} onClick={() => setState('bad')}>
              <img className="review-switch_img" src={HistoryIcon} alt="" />
              <p className="review-switch_num" style={{ color: "#3A8CED" }}>{pagenationForBad.total}</p>
            </div>
            {/* 選択中じゃない時は#B6B2AA */}
          </div>
          <InfiniteScroll
            element='ol'
            className="review-list"
            pageStart={1}
            hasMore={!showLoader && (state === 'good' ? pagenationForGood.total > goodReputations.length : pagenationForBad.total > badReputations.length)}
            loadMore={state === 'good' ? fetchMoreGoodData : fetchMoreBadData}
            initialLoad={false}
            style={{ padding: '24px 20px' }}
          >
            {
              (state === 'good' ? goodReputations : badReputations).map((comment: any) => {
                return (
                  <CommentCard HistoryIcon={HistoryIcon} comment={comment} key={comment.id} />
                );
              })
            }
          </InfiniteScroll>
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            {showLoader ? <CircularProgress style={{ margin: "24px auto" }}/> : ""}
          </div>
        </div>
        <style jsx>{`
          *{
            margin:0;
            padding:0;
            border:0;
            outline:0;
            list-style:none;
          }
          a{
            text-decoration: none;
          }
          .container{
            width: 100%
          }
          // ヘッダー
          header{
            height: 56px;
            width: 100%;
            position: fixed;
            background: #FF8A1F;
            display: flex;
            justify-content: space-between;
            padding: 6px 10px;
            box-sizing: border-box;
            z-index: 100;
          }
          .icon-list{
            display: flex;
            padding: 0;
          }
          .icon-list_option{
            text-align: center;
            width: 44px;
            height: 44px;
            margin-right: 4px;
          }
          .icon-list_option_menu{
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .icon-list_img{
            width: 32px;
            height: 32px;
          }
          .icon-list_caption{
            font-size: 8px;
            line-height: 12px;
            color: white;
          }
          // 中身
          .content{
            position: relative;
            top: 56px;
            min-height: 100vh;
          }
          .sub-header{
            background: #FFFFFF;
            width: 100%;
            height: 40px;
            text-align: center;
            margin-bottom: 8px;
          }
          .sub-header_btn{
            width: 40px;
            height: 40px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sub-header_title{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #333333;
            margin: 9px auto 7px auto;
          }
          
          .review-switch_container{
            width: 100%;
            display: flex;
          }
          .review-switch{
            width: 50%;
            display: flex;
            justify-content: center;
          }
          .review-switch_img{
            width: 24px;
            margin-right: 4px;
            height: auto;
          }
          .review-switch_num{
            font-weight: bold;
            font-size: 12px;
            line-height: 19px;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}