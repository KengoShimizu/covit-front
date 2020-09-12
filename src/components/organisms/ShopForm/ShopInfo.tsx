import React, { useEffect, useState } from 'react';
// library
import { Sun, Moon, ArrowRight } from 'react-feather';
import axios from "axios";
import useReactRouter from "use-react-router";
import Compress from 'compress.js';
// atoms
import Button, { ButtonThemes } from '../../atoms/Button'
import Text, { TextThemes } from '../../atoms/Text'
import Select, { SelectThemes } from '../../atoms/Select'
import InputFile, { InputFileThemes } from '../../atoms/InputFile';
import Input, { InputThemes } from '../../atoms/Input'
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
import Validation from '../../../common/Validate';

interface ShopInfoProps {
  setPage?: any;
  addData: any;
  setAddData: any;
  defaultLinks?: any;
  setEditIsOK?: any;
}

export const ShopInfo: React.FC<ShopInfoProps> = ({ setPage, setAddData, addData, defaultLinks, setEditIsOK}) => {
  const { match }: any = useReactRouter();
  const compress = new Compress()
  const isOwnerPage = match.path.match(/owner/g);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [links, setLinks] = useState({
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
  });
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

  const handleImageChange = (event: any) => {
    compress.compress([event.target.files[0]], {
      size: .2, // 200kbに圧縮
      maxWidth: 800,
      maxHeight: 300,
      quality: 1, // 画像の品質(画質？)1が最大値
    }).then((res) => {
      setAddData({
        ...addData,
        shop: {
          ...addData.shop,
          image: res[0].prefix+res[0].data
        }
      });
    });
  }

  const handleGenreChange = (event: any) => {
    if (!(addData.shop.image.length > 100)) {
      const defaultImage = genres.find((data: any) => data.id === parseInt(event.target.value))?.image
      setAddData({
        ...addData,
        [event.target.name]: event.target.value,
        shop: {
          ...addData.shop,
          image: defaultImage
        }
      });
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    setAddData({
      ...addData,
      links: Object.values(links).filter((link: Link) => link.url && link.url !== '')
    });
  }, [links]);

  useEffect(() => {
    if (isOwnerPage) {
      if (Validation.formValidate('owner_shop_form', addData)) {
        setIsOK(false);
        if (setEditIsOK) setEditIsOK(false);
      } else {
        setIsOK(true);
        if (setEditIsOK) setEditIsOK(true);
      }
    } else {
      if (Validation.formValidate('user_shop_form', addData)) setIsOK(false)
      else setIsOK(true)
    }
  }, [addData]);

  useEffect(() => {
    if (defaultLinks && defaultLinks.length) {
      setLinks({
        homepage: {
          name: 'ホームページ',
          url: defaultLinks.filter((link: Link) => link.url_type === LinkType.OTHER)[0]?.url,
          url_type: LinkType.OTHER
        },
        instagram: {
          name: 'Instagram',
          url: defaultLinks.filter((link: Link) => link.url_type === LinkType.INSTAGRAM)[0]?.url,
          url_type: LinkType.INSTAGRAM
        },
        twitter: {
          name: 'Twitter',
          url: defaultLinks.filter((link: Link) => link.url_type === LinkType.TWITTER)[0]?.url,
          url_type: LinkType.TWITTER
        },
        facebook: {
          name: 'Facebook',
          url: defaultLinks.filter((link: Link) => link.url_type === LinkType.FACEBOOK)[0]?.url,
          url_type: LinkType.FACEBOOK
        }
      })
    }
  }, [defaultLinks])

  return (
    <div className="container">
      {setPage ?
        isOwnerPage ? 
          <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{ marginBottom: '32px' }} >ユーザーがあなたのお店について知れるように、お店の情報の登録をお願いしています！</Text> 
          : 
          <React.Fragment>
            <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{ marginBottom: '32px' }} >感染対策をしているお店の推薦していただくとお店の情報が追加されるかもしれません！</Text> 
            <div style={{display: 'flex'}}>
              <div style={{color: CommonStyle.TextDarkGary}}>※</div>
              <Text theme={[TextThemes.CAPTION, TextThemes.SMALL]} propStyle={{ marginBottom: '32px', color: CommonStyle.TextDarkGary }} >感染対策の内容についてチェックを行うため、登録はリクエストの許可制となっております。</Text> 
            </div>
          </React.Fragment>
          :
          <React.Fragment></React.Fragment>
      }
      <ShopForm handleChange={handleChange} addData={addData} phoneHandleChange={(e: any) => handleChange(e)}/>
      {isOwnerPage &&
        /* 営業時間フォーム */
        <ShopBusinessDateForm setAddData={setAddData} addData={addData} defaultBusinessDate={addData.shop.business_date ? addData.shop.business_date : ""}/>
      }
      <div className="hr"></div>
      {/* ジャンル系 */}
      <Select theme={SelectThemes.REQUIRED} handleChange={handleGenreChange} label='お店のジャンル' defaultLabel="お店のジャンルを選択してください" items={genres} name="genre_id" defaultValue={addData.genre_id} labelColor={{color: CommonStyle.TextBlack}}/>
      {setPage ?
        !isOwnerPage &&
          <React.Fragment>
            <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '180px' }} onClick={isOK ? () => setPage(2) : () => {}}>
              詳細をスキップ<ArrowRight size={16} />
            </Button>
            {/* 電話番号 */}
            <Input 
              handleChange={(e: any) => handleChange(e)}
              theme={[InputThemes.SHOP_REGISTRATION]}
              label='電話番号(半角数字のみ)'
              placeholder='000○○○0000'
              content={addData.shop.contact}
              name='contact'
              labelColor={{color: CommonStyle.TextBlack}}/>
            {/* 営業時間フォーム */}
            <ShopBusinessDateForm setAddData={setAddData} addData={addData} />
          </React.Fragment> : <React.Fragment></React.Fragment>
      }
      <div className="price_container">
        <label className="price_label">料理の価格帯</label>
        <div className="price_select-container">
          <Sun color={CommonStyle.TextDarkGary} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          <Select
            theme={SelectThemes.INIT}
            handleChange={handleChange}
            label=''
            defaultLabel="価格帯を選択してください"
            items={PriceArray}
            name="price_day"
            propStyle={{ width: ' 14em', display: 'inline-block' }}
            defaultValue={addData.shop.price_day} />
        </div>
        <div className="price_select-container">
          <Moon color={CommonStyle.TextDarkGary} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          <Select 
            theme={SelectThemes.INIT}
            handleChange={handleChange}
            label=''
            defaultLabel="価格帯を選択してください"
            items={PriceArray}
            name="price_night"
            propStyle={{ width: '14em', display: 'inline-block' }}
            defaultValue={addData.shop.price_night} />
        </div>
      </div>
      <label>ヘッダー画像</label>
      <div className="shop-img_wrapper">
        <img className="shop-img" src={addData.shop.image ? addData.shop.image : "/charactor.png"} alt="shop header" />
      </div>
      {/* 一般ユーザーには画像を投稿させない */}
      {
        isOwnerPage ?  <InputFile theme={InputFileThemes.INIT} label="画像をアップロードする" handleChange={handleImageChange} /> : <React.Fragment />
      }
      <div className="hr"></div>
      {/* リンク系 */}
      <ShopLinkForm handleLinkChange={handleLinkChange} links={links} />
      {setPage ?
        isOwnerPage ?
          <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={isOK ? () => setPage(2) : () => {}}>
            次へ <ArrowRight />
          </Button>
          :
          <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '150px' }} onClick={isOK ? () => setPage(2) : () => {}}>
            次へ <ArrowRight />
          </Button> : <React.Fragment></React.Fragment>
      }
      <style jsx>
        {`
        label {
          font-weight: bold;
          margin-bottom: 8px;
          font-size: ${CommonStyle.Caption};
          display: block;
        }
        .price_container{
          margin-bottom: 24px;
          margin-top: 24px;
        }
        .price_select-container{
          margin-bottom: 16px;
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
          width: auto;
          height: 100%;
          margin: 0 auto;
          display: block;
        }
        .hr{
          margin: 8px auto 32px auto;
          width: 100%;
          border: 1px solid #C0C0C0;
        }
        `}
      </style>
    </div>
  );
}
