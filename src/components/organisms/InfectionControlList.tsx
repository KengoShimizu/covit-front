import React, { useState } from 'react';
// components
import Icon, { IconThemes } from '../atoms/Icon';
import Text, { TextThemes } from '../atoms/Text';
import CommonStyle from '../../common/CommonStyle';

const pointerLocation = ['8%', '29%', '49%', '70%', '91%'];

interface InfectionControlListProps {
  stepData: any
}

const InfectionControlList: React.FC<InfectionControlListProps> = ({stepData}) => {
  const [controllDetail, setControllDetail] = useState([]);
  const [isInit, setIsInit] = useState(true);
  const [clickedIndex, setClickedIndex] = useState(0);

  const GetUniqueImgs = () => {
    const uniqueArray = stepData?.map((data: any) => data.step_category.id);
    const categoryData = stepData?.map((data: any) => data.step_category);
    return categoryData.filter((x: any, i: number) => uniqueArray.indexOf(x.id) === i);
  }
  const uniqueCategory = GetUniqueImgs();
  
  const showControllDetail = (id: number, i: number) => {
    setControllDetail(stepData.filter((data: any) => data.step_category_id === id));
    setClickedIndex(i);
    setIsInit(false);
  }

  return (
    <div className='infection-control'>
      <ol className="infection-control_list">
        {uniqueCategory?.map((data: any, i: number) => (
          <li className={`infection-control_option ${clickedIndex === i && 'clicked'}` }key={`icon${i}`} onClick={() => showControllDetail(data.id, i)}>
            <Icon theme={[IconThemes.COVIDMEASURE]}>
              <img className="infection-control_icon" src={data.image} alt={data.content}/>
            </Icon>
          </li>
        ))}
      </ol>
      <ol className="infection-control_comment-box">
        {/* 対策内容の初期表示 */}
        {isInit && stepData.filter((data: any) => data.step_category_id === uniqueCategory[0].id)?.map((data: any, i:number) => 
          <li className="infection-control_comment" key={`control${i}`}><Text theme={[TextThemes.SMALL]}>{data.content}</Text></li>
        )}
        {/* 他の対策内容 */}
        {controllDetail?.map((data: any, i:number) => 
          <li className="infection-control_comment" key={`control${i}`}><Text theme={[TextThemes.SMALL]}>{data.content}</Text></li>
        )}
      </ol>
      <style jsx>{`
        .infection-control{
          width: 340px;
          margin: 0 auto 10px;
        }
        .infection-control_list{
          display: flex;
          justify-content: flex-start;
          margin-bottom: 16px;
          width: 340px;
          margin: 0 auto 20px;
        }
        .infection-control_option :not(:last-child) {
          margin-right: 10px;
        }
        .infection-control_option{
          box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.19);
          width: 60px;
          height: 60px;
          border-radius: 60px;
          background: ${CommonStyle.KeyColor};
          display: flex;
          align-items: center;
          justify-content: center;
          transition-duration: .5s;
        }
        .clicked{
          background: ${CommonStyle.AccentColor};
        }
        .infection-control_icon{
          width: 34px;
          height: auto;
        }
        .infection-control_comment-box{
          background: ${CommonStyle.BgGray};
          position: relative;
          padding: 16px 20px;
          border-radius: 8px;
          width: 100%;
          box-sizing: border-box;
          margin: 0 auto;
          font-weight: bold;
          font-size: 12px;
          line-height: 19px;
          color: ${CommonStyle.TextBlack};
        }
        .infection-control_comment:not(:last-child){
          margin-bottom: 2px;
        }
        .infection-control_comment::before{
          left: calc(${pointerLocation[clickedIndex]} - 4px);
          content: '';
          position: absolute;
          top: -8px;
          display: block;
          width: 0;
          height: 0;
          border-right: 6px solid transparent;
          border-bottom: 8px solid #E7E7E7;
          border-left: 6px solid transparent;
        }
      `}</style>
    </div>
  );
}

export default InfectionControlList;