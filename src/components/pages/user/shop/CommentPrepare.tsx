import React, { useState } from 'react';
// library
import { Search } from 'react-feather';
// components
import HomeLayout from '../../../templates/HomeLayout';
import HistoryCardList from '../../../organisms/CardList/HistoryCardList';
import Input from '../../../atoms/Input';
// common
import { RouteName } from './../../../../common/Const';
import { RequestTextSection } from '../../../molecules/RequestTextSection';
import FooterActionBar from '../../../organisms/FooterActionBar';

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
      <div>
        <Input
          handleChange={handleChange}
          name='name'
          placeholder='お店名で検索'
          content={searchData.name}
          icon={<Search />}
          propStyle={{ margin: '16px auto', maxWidth: '330px', width: '90%' }}
        />
      </div>
      <div>
        <HistoryCardList maxRow={3} props={props} />
      </div>
      <RequestTextSection />
      <FooterActionBar propStyle={{  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}/>
    </HomeLayout>
  );
}