import React, { useEffect, useState } from 'react';
// library
import { ArrowRight } from 'react-feather';
import axios from "axios";
import useReactRouter from "use-react-router";
// atoms
import Button, { ButtonThemes } from '../../atoms/Button'
import Text, { TextThemes } from '../../atoms/Text'
import Textarea, { TextareaThemes } from '../../atoms/Textarea'
// organisms
import { CheckSectionList } from './CheckSectionList'
// types
import StepCategory from '../../../types/StepCategory';

interface InfectionControlProps {
  setPage: any;
  addData: any;
  setAddData: any;
}

export const InfectionControl : React.FC<InfectionControlProps> = ({ setPage, setAddData, addData }) => {
  const { match }: any = useReactRouter();
  const [loading, setLoading] = useState(true);
  const identifer = match.path.match(/owners/g) ? 'owner' : 'user';
  const [stepCategories, setStepCategories] = useState<StepCategory[]>([]);
  const [stepIDs, setStepIDs] = useState<number[]>([]);

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
        ...addData.shops,
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
    setAddData({
      ...addData,
      'step_ids': stepIDs
    })
  }, [stepIDs])

  return (
    loading ? <div></div> :
    <div className="container">
      <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} >現在お店でおこなっている感染対策に当てはまるものをチェックしてください。</Text>
      <Text theme={[TextThemes.SUBTITLE, TextThemes.LEFT]} propStyle={{ marginBottom: '32px' }}>感染対策の内容はユーザーに公開されます。</Text>
      <CheckSectionList stepCategories={stepCategories} setStepIDs={setStepIDs} stepIDs={stepIDs}/>
      <Textarea theme={TextareaThemes.INIT} handleChange={handleChange} label='その他' name='other_step' subtitle='その他にお店で行っている感染対策やメッセージがあればご記入ください。' />
      <Button theme={[ButtonThemes.NORMAL]} propStyle={{margin: '24px auto', width: '150px'}} onClick={() => setPage(2)}>
        次へ <ArrowRight />
      </Button>
      <style jsx>
        {`
        `}
      </style>
    </div>
  );
}