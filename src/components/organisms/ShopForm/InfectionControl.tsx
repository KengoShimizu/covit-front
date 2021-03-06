import React, { useEffect, useState } from 'react';
// library
import { ArrowRight } from 'react-feather';
import axios from "axios";
import useReactRouter from "use-react-router";
// components
import Button, { ButtonThemes } from '../../atoms/Button';
import Text, { TextThemes } from '../../atoms/Text';
import Textarea, { TextareaThemes } from '../../atoms/Textarea';
import { CheckSectionList } from './CheckSectionList';
import Loading from '../../molecules/Loading';
// types
import StepCategory from '../../../types/StepCategory';
// common
import Validate from '../../../common/Validate';
import CommonStyle from '../../../common/CommonStyle';

interface InfectionControlProps {
  setPage?: any;
  addData: any;
  setAddData: any;
  post?: any;
  noKanaName?: boolean;
  load2?: boolean;
  setEditIsOK?: any;
  setIsOK?: any;
  isOK?: boolean;
}

export const InfectionControl : React.FC<InfectionControlProps> = ({ setPage, setAddData, addData, post, load2, noKanaName, setEditIsOK, setIsOK, isOK }) => {
  const { match }: any = useReactRouter();
  const [loading, setLoading] = useState(true);
  const isEdit = match.path.match(/edit/g);
  const identifer = match.path.match(/owner/g) ? 'owner' : 'user';
  const [stepCategories, setStepCategories] = useState<StepCategory[]>([]);

  const fetchStepCategories = async (isSubscribed: boolean) => {
    try {
      const res = await axios.get(`/api/v1/${identifer}/step_categories`);
      if (isSubscribed) setStepCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: any) => {
    setAddData({
      ...addData,
      shop: {
        ...addData.shop,
        [event.target.name]: event.target.value
      }
    })
  }
  
  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    fetchStepCategories(isSubscribed);
    setLoading(false);
    const cleanup = () => {
      isSubscribed = false;
    };
    return cleanup;
  }, [])

  useEffect(() => {
    if(Validate.formValidate('shop_form_infections', addData.step_ids)) {
      if (setIsOK) setIsOK(false);
      if (setEditIsOK) setEditIsOK(false);
    } else {
      if (setIsOK) setIsOK(true);
      if (setEditIsOK) setEditIsOK(true);
    }
  }, [addData.step_ids]);

  useEffect(() => {
    if (setIsOK) setIsOK(false)
  }, [load2])

  return (
    loading ? <Loading/> :
    <div className="container">
      {load2 && <Loading/>}
      {!(identifer !== 'user' && post) &&
        <React.Fragment>
          <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} >????????????????????????????????????????????????????????????????????????????????????????????????????????????</Text>
          <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{ marginBottom: '32px' }}>????????????????????????????????????????????????????????????</Text>
        </React.Fragment>
      }
      <CheckSectionList stepCategories={stepCategories} setAddData={setAddData} addData={addData}/>
      {addData.shop.other_step && isEdit &&
        <Textarea content={addData.shop.other_step} theme={TextareaThemes.INIT} handleChange={handleChange} label='?????????' name='other_step' subtitle='????????????????????????????????????????????????????????????????????????????????????' />
      }
      {!isEdit &&
        <Textarea theme={TextareaThemes.INIT} handleChange={handleChange} label='?????????' name='other_step' subtitle='????????????????????????????????????????????????????????????????????????????????????' />
      }
      {identifer === 'user' || (!isEdit && !noKanaName) ?
        <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{margin: '24px auto', width: '150px'}} onClick={isOK ? () => post(2) : () => {}}>
          ?????????????????????
        </Button>
        : post ? 
          <React.Fragment/>
          :
          <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} propStyle={{margin: '24px auto', width: '150px'}} onClick={isOK ? () => setPage(3) : () => {}}>
            ?????? <ArrowRight />
          </Button>
      }
      <style jsx>
        {`
          .container{
            max-width: 600px;
            margin: 0 auto;
            width: 90%;
          }
        `}
      </style>
    </div>
    
  );
}