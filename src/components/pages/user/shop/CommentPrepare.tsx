import React, { useState } from 'react';
// library
import { Search } from 'react-feather';
// components
import HomeLayout from '../../../templates/HomeLayout';
import HistoryCardList from '../../../organisms/CardList/HistoryCardList';
import Input from '../../../atoms/Input';
import Text, { TextThemes } from '../../../atoms/Text';
// common
import { RequestTextSection } from '../../../molecules/RequestTextSection';
import FooterActionBar from '../../../organisms/FooterActionBar';

interface SearchParam {
  name: string;
}

// コメント投稿のためのショップの検索
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
      <Input
        handleChange={handleChange}
        name='name'
        placeholder='お店名で検索'
        content={searchData.name}
        icon={<Search />}
        propStyle={{ margin: '16px auto', maxWidth: '330px', width: '90%' }}
      />
      <Text theme={[TextThemes.CAPTION]} propStyle={{margin: '4px 10px'}}>閲覧履歴</Text>
      <HistoryCardList maxRow={4} props={props} type='search'/>
      <div className='mt10'>
        <RequestTextSection />
      </div>
      <FooterActionBar propStyle={{  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}/>
      <style jsx>{`
        .mt10{
          margin: 45px 0 130px;
        }
      `}</style>
    </HomeLayout>
  );
}