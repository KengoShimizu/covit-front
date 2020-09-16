import React from 'react';
// library
import { Smile, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
import Shop from '../../../types/Shop';

interface ShopCardProps {
  shop: Shop;
  type?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, type }) => {
  const uri = type === 'search' ? '?from=search' : '';
  return (
    // <Link to={`/shops/${shop.id}/comments/new${uri}`}>
    <Link to={`/shops/${shop.id}?from=search`}>
      <li className="shop-card">
        <div className="shop-card_content">
          <h2 className="shop-card_name">{shop.name}</h2>
          {/* <div className="shop-card_info">
            <ul className="shop-card_review">
              {shop?.good_count !== 0 &&
                <li className="shop-card_review_option" style={{color: CommonStyle.TextBlack}}>
                  <span className="shop-card_review-icon">
                    <Smile size="20" color="#ED753A" />
                  </span>
                  最高！ {shop.good_count}件
                </li>
              }
            </ul>
          </div> */}
        </div>
        <button className="shop-card_btn"><ChevronRight size="20" color="#333" /></button>
      </li>
      <style jsx>{`
        //カード
        .shop-card{
          background: ${CommonStyle.BgWhite};
          width: 100%;
          padding: 12px 16px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        .shop-card_content{
          width: calc(100% - 60px);
          margin-right: 16px;
        }
        .shop-card_name{
          font-weight: bold;
          font-size: 18px;
          line-height: 24px;
          color: ${CommonStyle.TextBlack};
          margin-bottom: 8px;
        }
        .shop-card_info{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .shop-card_review{
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 12px;
        }
        .shop-card_review_option{
          display: flex;
          align-items: center;
          margin-right: 12px;
        }
        .shop-card_review-icon{
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 4px;
        }
        .shop-card_date{
          display: flex;
          align-items: center;
          color: ${CommonStyle.TextDarkGary};
          font-weight: bold;
          font-size: 12px;
        }
        .shop-card_date_text{
          color: ${CommonStyle.TextDarkGary};
        }
        .shop-card_date_num{
          color: ${CommonStyle.TextDarkGary};
        }
        .shop-card_date_icon,.shop-card_date_text{
          margin-right: 8px;
        }
        .shop-card_btn{
          width: 44px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    
    </Link>
  );
}

export default ShopCard;