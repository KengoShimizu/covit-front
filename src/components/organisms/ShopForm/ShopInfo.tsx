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
import Input from '../../atoms/Input'
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
import Validation from '../../../common/Validate';

interface ShopInfoProps {
  setPage?: any;
  addData: any;
  setAddData: any;
  defaultLinks?: any;
}

export const ShopInfo: React.FC<ShopInfoProps> = ({ setPage, setAddData, addData, defaultLinks}) => {
  const { match }: any = useReactRouter();
  const compress = new Compress()
  const [image, setImage] = useState<string | ArrayBuffer | null>();
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

  const handleImageChange = async (event: any) => {
    const resizedImage = await compress.compress([event.target.files[0]], {
      size: .2, // 200kbに圧縮
      maxWidth: 800,
      maxHeight: 300,
      quality: 1, // 画像の品質(画質？)1が最大値
    })
    console.log(resizedImage )
    setAddData({
      ...addData,
      shop: {
        ...addData.shop,
        image: resizedImage[0].prefix+resizedImage[0].data
      }
    });
  }


  const handleGenreChange = (event: any) => {
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

  const phoneHandleChange = (e: any) => {
    if(!Validation.formValidate('owner_phone', e.target.value)){
      handleChange(e);
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
      if (Validate.formValidate('owner_shop_form', addData)) setIsOK(false)
      else setIsOK(true)
    } else {
      if (Validate.formValidate('user_shop_form', addData)) setIsOK(false)
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
      <ShopForm handleChange={handleChange} addData={addData} phoneHandleChange={phoneHandleChange}/>
      {isOwnerPage &&
        /* 営業時間フォーム */
        <ShopBusinessDateForm setAddData={setAddData} addData={addData} defaultBusinessDate={addData.shop.business_date ? addData.shop.business_date : ""}/>
      }
      {/* ジャンル系 */}
      <Select theme={SelectThemes.REQUIRED} handleChange={handleGenreChange} label='お店のジャンル' defaultLabel="お店のジャンルを選択してください" items={genres} name="genre_id" defaultValue={addData.genre_id}/>
      {setPage ?
        !isOwnerPage &&
          <React.Fragment>
            <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{ margin: '24px auto', width: '180px' }} onClick={isOK ? () => setPage(2) : () => {}}>
              詳細をスキップ<ArrowRight size={24} />
            </Button>
            {/* 電話番号 */}
            <Input handleChange={phoneHandleChange} label='電話番号(半角数字のみ)' placeholder='02019228888' content={addData.shop.contact} name='contact' />
            {/* 営業時間フォーム */}
            <ShopBusinessDateForm setAddData={setAddData} addData={addData} />
          </React.Fragment> : <React.Fragment></React.Fragment>
      }
      <label>料理の価格帯</label>
      <div>
        <Sun color={CommonStyle.TextDarkGary} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        <Select theme={SelectThemes.INIT} handleChange={handleChange} label='' defaultLabel="価格帯を選択してください" items={PriceArray} name="price_day" propStyle={{ marginBottom: '8px', width: '75%', display: 'inline-block' }} defaultValue={addData.shop.price_day} />
      </div>
      <div>
        <Moon color={CommonStyle.TextDarkGary} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        <Select theme={SelectThemes.INIT} handleChange={handleChange} label='' defaultLabel="価格帯を選択してください" items={PriceArray} name="price_night" propStyle={{ width: '75%', display: 'inline-block' }} defaultValue={addData.shop.price_night} />
      </div>
      {/* FIXME ImageUploaderみたいなAPI作った方が良い */}
      <label>ヘッダー画像</label>
      <div className="shop-img_wrapper">
        <img className="shop-img" src={addData.shop.image ? addData.shop.image : "/charactor.png"} alt="shop header" />
      </div>
      <canvas
        id="canvas"
        style={{
          display: "none"
        }}
        width="64"
        height="64"
      />
      <InputFile theme={InputFileThemes.INIT} label="画像をアップロードする" handleChange={handleImageChange}/>
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
          width: auto;
          height: 100%;
          margin: 0 auto;
          display: block;
        }
        `}
      </style>
    </div>
  );
}
