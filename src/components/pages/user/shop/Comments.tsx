import React from 'react';
// library
import useReactRouter from "use-react-router";
// components
import HomeLayout from '../../../templates/HomeLayout';
import CommnetsCardList from '../../../organisms/CardList/CommentsCardList';


// ショップのコメント一覧
export const ShopComments: React.FC = (props: any) => {
  const { match }: any = useReactRouter();
  return (
    <HomeLayout headerText={'コメント一覧'} prevRef={`/shops/${match.params.id}`} history={props.history}>
      <CommnetsCardList sqlQuery={`shop_id=${match.params.id}`}/>
    </HomeLayout>
  );
}