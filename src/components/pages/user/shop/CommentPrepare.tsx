import React, { useState } from 'react';
// library
import useReactRouter from "use-react-router";
// components
import HomeLayout from '../../../templates/HomeLayout';
import HistoryCardList from '../../../organisms/CardList/HistoryCardList';

import Input from '../../../atoms/Input';
import { Search } from 'react-feather';
interface SearchParam {
  name: string;
}

// ショップの検索
export const CommentPrepare: React.FC = (props: any) => {
  const [searchData, setSearchData] = useState<SearchParam>({
    name: '',
  });

  const handleChange = (event: any) => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <HomeLayout headerText='お店のレビューを登録する' prevRef='/'>
      <Input handleChange={handleChange} label='name' placeholder='お店名で検索' content={searchData.name} icon={<Search />} />
      sav
      <HistoryCardList />
    </HomeLayout>
  );
}