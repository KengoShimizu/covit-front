import React from 'react';
// common
import CommonStyle from './../../../common/CommonStyle';
import { ShopStatus } from './../../../common/Const';
// components
import Text, { TextThemes } from './../../atoms/Text';
import Button, { ButtonThemes } from './../../atoms/Button';
import AccoutTopCard from './../../molecules/Card/AccoutTopCard';
import NextRefBtn from './../../molecules/NextRefBtn';

const propStyle = {
  shopName: {
    fontSize: '1em',
    paddingBottom: '12px'
  },
  statusText: {
    margin: 'auto',
  },
  statusBtn: {
    backgroundColor: CommonStyle.BgWhite,
  },
  listStyle: {
    marginBottom: '8px',
  }
};

interface OwnerShopCardProps {
  shop: any;
  deleteModal: any;
  publishModal: any;
}

const OwnerShopCard: React.FC<OwnerShopCardProps> = ({ shop, deleteModal, publishModal }) => {
  return (
    <div className="shop-card-container">
      <div className="shop-card">
        <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.shopName}>{shop.name}</Text>
        <div className="publish-status">
          <div className="publish-status-left">
            <div className={shop.status === ShopStatus.APPROVED ? 'active-circle' : 'disable-circle'}></div>
            <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.statusText}>
              {shop.status === ShopStatus.UNAPPROVED && 'リクエスト中'}
              {shop.status === ShopStatus.APPROVED && '公開中'}
              {shop.status === ShopStatus.NOT_PUBLISHED && '非公開中'}
            </Text>
          </div>
          {shop.status !== ShopStatus.UNAPPROVED &&
            <div className="publish-status-right">
              <Button theme={[ButtonThemes.SUBBTN]} propStyle={propStyle.statusBtn} onClick={() => publishModal(shop.id, shop.status)}>
                {shop.status === ShopStatus.APPROVED && '公開停止'}
                {shop.status === ShopStatus.NOT_PUBLISHED && '公開'}
              </Button>
            </div>
          }
        </div>
        <AccoutTopCard src='/cutlery.svg' text="お店の基本情報を編集" nextRef={`/owner/shop/${shop.id}/edit/detail`} listStyle={propStyle.listStyle}/>
        <AccoutTopCard src='/infection.svg' text="感染対策の内容を編集" nextRef={`/owner/shop/${shop.id}/edit/infections`} listStyle={propStyle.listStyle}/>
        <hr className="shop-card-hr" />
        <AccoutTopCard src='/trash2.svg' text="お店の情報を削除する" onClick={() => deleteModal(shop.id, shop.name)} />
        <hr className="shop-card-hr" />
        <NextRefBtn text={shop.status !== ShopStatus.APPROVED ? 'お店の情報を確認する' : '公開ページを確認する'} nextRef={`/shops/${shop.id}`} />
      </div>
      <style>{`
        .shop-card-container{
          margin-top: 20px;
          padding: 8px;
          max-width: 550px;
          margin: 0 auto;
          margin-top: 24px;
        }
        .shop-card{
          padding: 16px;
          border: 1px solid ${CommonStyle.BorderGray};
          border-radius: 4px;
          box-shadow: 0px 0px 4px 0px ${CommonStyle.BorderGray};
          
        }
        .publish-status{
          padding: 12px 0;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          background-color: ${CommonStyle.BgGray};
          width: calc(100% + 32px);
          margin-left: -16px;
        }
        .active-circle{
          margin: auto 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${CommonStyle.AccentColor};
        }
        .disable-circle{
          margin: auto 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${CommonStyle.BorderGray};
        }
        .publish-status-left{
          display: flex;
          margin-left: 16px;
        }
        .publish-status-right{
          margin-right: 20px;
        }
        .shop-card-hr{
          height: 1px;
          background: ${CommonStyle.BgGray};
          width: calc(100% + 32px);
          margin: 10px 0 10px -16px;
        }
      `}</style>
    </div>
  );
}

export default OwnerShopCard;