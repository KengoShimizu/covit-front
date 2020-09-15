import React from 'react';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import ShopCard from '../../molecules/Card/ShopCard';
// types
import Shop from '../../../types/Shop';

interface ShopCardListProps {
  shops: Shop[];
  type?: string;
}

const ShopCardList: React.FC<ShopCardListProps> = ({ shops, type }) => {

  return (
      <div className="container">
        <ol className="card-list">
          {shops.map((shop: Shop, index: number) => {
            return (
              <ShopCard key={`shop_card${index}`} shop={shop} type={type}/>
            )
          })}
        </ol>
        <style jsx>{`
        .container {
          background-color: ${CommonStyle.BgGray}
        }
        .card-list {
          padding: 12px 0 100px 0;
        }
      `}</style>
      </div>
  );
}

export default ShopCardList;