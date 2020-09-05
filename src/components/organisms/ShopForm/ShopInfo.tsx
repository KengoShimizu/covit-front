import React, { useEffect, useState } from 'react';
// library
import { Sun, Moon, ArrowRight } from 'react-feather';
import axios from "axios";
import useReactRouter from "use-react-router";
// atoms
import Button, { ButtonThemes } from '../../atoms/Button'
import Text, { TextThemes } from '../../atoms/Text'
import Select, { SelectThemes } from '../../atoms/Select'
import InputFile, { InputFileThemes } from '../../atoms/InputFile';
// organisms
import { ShopForm } from '../../organisms/ShopForm/ShopForm';
import { ShopLinkForm } from '../../organisms/ShopForm/ShopLinkForm';
import { ShopBusinessDateForm } from '../../organisms/ShopForm/ShopBusinessDateForm';
// types
import Genre from '../../../types/Genre';
import Link from '../../../types/Link';
// common
import { PriceArray, LinkType } from '../../../common/Const'
import CommonStyle from '../../../common/CommonStyle';
import Validate from '../../../common/Validate';

interface ShopInfoProps {
  setPage: any;
  addData: any;
  setAddData: any;
}
// FIXME 汚すぎだけど、どう実装しよう~
var defaultLinks = {
  homepage: {
    name: 'ホームページ',
    url: '',
    url_type: LinkType.OTHER
  },
  instagram: {
    name: 'Instagram',
    url: '',
    url_type: LinkType.INSTAGRAM
  },
  twitter: {
    name: 'Twitter',
    url: '',
    url_type: LinkType.TWITTER
  },
  facebook: {
    name: 'Facebook',
    url: '',
    url_type: LinkType.FACEBOOK
  }
}

export const ShopInfo: React.FC<ShopInfoProps> = ({ setPage, setAddData, addData }) => {
  const { match }: any = useReactRouter();
  const isOwnerPage = match.path.match(/owner/g);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [links, setLinks] = useState(defaultLinks);
  const [isOK, setIsOK] = useState(false);

  const fetchGenres = async () => {
    await axios.get('/api/v1/user/genres')
      .then(res => setGenres(res.data.data))
      .catch(err => console.log(err));
    return;
  }

  const handleLinkChange = (event: any) => {
    var link;
    switch (event.target.name) {
      case 'homepage':
        link = links.homepage;
        break;
      case 'twitter':
        link = links.twitter;
        break;
      case 'facebook':
        link = links.facebook;
        break;
      case 'instagram':
        link = links.instagram;
        break;
    }
    setLinks({
      ...links,
      [event.target.name]: {
        ...link,
        url: event.target.value
      }
    })
  }

  const handleChange = (event: any) => {
    setAddData({
      ...addData,
      shop: {
        ...addData.shop,
        [event.target.name]: event.target.value
      }
    });
  }

  const handleGenreChange = (event: any) => {
    setAddData({
      ...addData,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    setAddData({
      ...addData,
      links: Object.values(links).filter((link: Link) => link.url !== '')
    });
  }, [links]);

  useEffect(() => {
    if (isOwnerPage) {
      if (Validate.formValidate('owner_shop_form', addData)) setIsOK(false)
      else setIsOK(true)
    } else {
      if (Validate.formValidate('user_shop_form', addData)) setIsOK(false)
      else setIsOK(true)
    }
  }, [addData]);

  return (
    <div className="container">
      <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{ marginBottom: '32px' }} >ユーザーがあなたのお店について知れるように、お店の情報の登録をお願いしています！</Text>
      <ShopForm handleChange={handleChange} addData={addData} />
      {isOwnerPage &&
        /* 営業時間フォーム */
        <ShopBusinessDateForm setAddData={setAddData} addData={addData} />
      }
      {/* ジャンル系 */}
      <Select theme={SelectThemes.REQUIRED} handleChange={handleGenreChange} label='お店のジャンル' defaultLabel="お店のジャンルを選択してください" items={genres} name="genre_id" />
      {!isOwnerPage &&
        <React.Fragment>
          <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '180px' }} onClick={isOK ? () => setPage(2) : () => {}}>
            詳細をスキップ<ArrowRight size={24} />
          </Button>
          {/* 営業時間フォーム */}
          <ShopBusinessDateForm setAddData={setAddData} addData={addData} />
        </React.Fragment>
      }
      <label>料理の価格帯</label>
      <div>
        <Sun color={CommonStyle.TextDarkGary} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        <Select theme={SelectThemes.INIT} handleChange={handleChange} label='' defaultLabel="価格帯を選択してください" items={PriceArray} name="price_day" propStyle={{ marginBottom: '8px', width: '75%', display: 'inline-block' }} />
      </div>
      <div>
        <Moon color={CommonStyle.TextDarkGary} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        <Select theme={SelectThemes.INIT} handleChange={handleChange} label='' defaultLabel="価格帯を選択してください" items={PriceArray} name="price_night" propStyle={{ width: '75%', display: 'inline-block' }} />
      </div>
      {/* FIXME ImageUploaderみたいなAPI作った方が良い */}
      <label>ヘッダー画像</label>
      <div className="shop-img_wrapper">
        <img className="shop-img" src={addData.shop.image ? addData.shop.image : ""} alt="shop header" />
      </div>
      <InputFile theme={InputFileThemes.INIT} label="画像をアップロードする" />
      {/* リンク系 */}
      <ShopLinkForm handleLinkChange={handleLinkChange} links={links} />
      {isOwnerPage ?
        <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={isOK ? () => setPage(3) : () => {}}>
          次へ <ArrowRight />
        </Button>
        :
        <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={isOK ? () => setPage(2) : () => {}}>
          次へ <ArrowRight />
        </Button>
      }
      <style jsx>
        {`
        label {
          font-weight: bold;
          margin-bottom: 0.25rem;
          font-size: ${CommonStyle.Caption};
          display: block;
        }
        .shop-img_wrapper{
          width: 320px;
          height: 120px;
          overflow: hidden;
          margin: 0 auto;
          margin-bottom: 16px;
          background: ${CommonStyle.BgGray}
        }
        .shop-img{
          width: 100%;
          height: auto;
        }
        `}
      </style>
    </div>
  );
}
