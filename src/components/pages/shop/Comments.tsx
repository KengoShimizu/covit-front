import React, { useState, useEffect } from 'react';
import {CommonStyle} from './../../../common/CommonStyle';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HistoryIcon from './../../../img/history.svg'
import { CommentCard } from './../../molecules/CommentCard'
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from '@material-ui/core';
import { Smile } from 'react-feather';
import { Frown } from 'react-feather';
import { ChevronLeft } from 'react-feather';
import Button, { ButtonThemes } from './../../atoms/Button';
import Title, { TitleThemes } from './../../atoms/Title';
import Icon, { IconThemes } from './../../atoms/Icon';
import useReactRouter from "use-react-router";
import { HomeLayout } from '../../templates/HomeLayout';
import { SubHeader } from './../../molecules/SubHeader';

const propStyle = {
  reviewIcon: {
    marginRight: '4px',
  }
};

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
          <SubHeader>
            <Link to={`/shops/${match.params.id}`}>
              <Button theme={[ButtonThemes.SUBHEADER]}>
                <ChevronLeft size={24} color="#333" />
              </Button>
            </Link>
            <Title theme={[TitleThemes.SUBHEADER]}>
              コメント一覧
            </Title>
          </SubHeader>
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
          .review-switch_container{
            width: 100%;
            display: flex;
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
    </HomeLayout>
  );
}