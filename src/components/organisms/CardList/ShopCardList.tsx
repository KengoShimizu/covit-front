import React from 'react';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import ShopCard from '../../molecules/Card/ShopCard';
// types
import Shop from '../../../types/Shop';

const propStyle = {
  errorText: {
    color: CommonStyle.AccentColor,
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  }
}

interface ShopCardListProps {
  shops: Shop[];
}

const ShopCardList: React.FC<ShopCardListProps> = ({ shops }) => {

  return (
      <div className="container">
        <ol className="card-list">
          {shops.map((shop: Shop, index: number) => {
            return (
              <ShopCard key={`shop_card${index}`} shop={shop} />
            )
          })}
        </ol>
        <style jsx>{`
        .container {
          background-color: ${CommonStyle.BgGray}
        }
        .card-list {
          padding: 12px 0;
        }
      `}</style>
      </div>
  );
}

export default ShopCardList;