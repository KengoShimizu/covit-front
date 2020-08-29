import React, { useState, useEffect } from 'react';
// components
import Icon, { IconThemes } from '../atoms/Icon';
import Text, { TextThemes } from '../atoms/Text';
import CommonStyle from '../../common/CommonStyle';

const pointerLocation = ['8%', '29%', '50%', '70%', '91%'];

interface InfectionControlListProps {
  stepData: any
}

const InfectionControlList: React.FC<InfectionControlListProps> = ({stepData}) => {
  const [controllDetail, setControllDetail] = useState([]);
  const [isInit, setIsInit] = useState(true);
  const [clickedIndex, setClickedIndex] = useState(0);

  const GetUniqueImgs = () => {
    const uniqueArray = stepData.map((data: any) => data.step_category.id);
    const categoryData = stepData.map((data: any) => data.step_category);
    return categoryData.filter(function (x: any, i: number) {
      return uniqueArray.indexOf(x.id) === i;
    });
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
        {uniqueCategory.map((data: any, i: number) => (
          <li className="infection-control_option" key={`icon${i}`} onClick={() => showControllDetail(data.id, i)}>
            <Icon theme={[IconThemes.COVIDMEASURE]}>
              <img className="infection-control_icon" src={data.image} alt={data.content}/>
            </Icon>
          </li>
        ))}
      </ol>
      <ol className="infection-control_comment-box">
        {/* 対策内容の初期表示 */}
        {isInit && stepData.filter((data: any) => data.step_category_id === uniqueCategory[0].id).map((data: any) => 
          <li className="infection-control_comment"><Text theme={[TextThemes.SMALL]}>{data.content}</Text></li>
        )}
        {/* 他の対策内容 */}
        {controllDetail.map((data: any) => 
          <li className="infection-control_comment"><Text theme={[TextThemes.SMALL]}>{data.content}</Text></li>
        )}
      </ol>
      <style jsx>{`
        .infection-control{
          margin-bottom: 12px;
        }
        .infection-control_list{
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }
        .infection-control_option :not(:last-child) {
          margin-right: 12px;
        }
        .infection-control_option{
          width: 60px;
          height: 60px;
          border-radius: 60px;
          background: ${CommonStyle.KeyColor};
          display: flex;
          align-items: center;
          justify-content: center;
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
          max-width: 344px;
          width: 80%;
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