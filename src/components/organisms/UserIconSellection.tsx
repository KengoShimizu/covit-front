import React from 'react';
// components
import Icon, { IconThemes } from '../atoms/Icon';
import Text, { TextThemes } from '../atoms/Text';
import CommonStyle from '../../common/CommonStyle';

interface UserIconSellectionProps {
  data: any;
  setData: any;
}


const UserIconSellection: React.FC<UserIconSellectionProps> = ({data, setData}) => {
  const handleChange = (event: any) => {
    setData({
      ...data,
      image: event.target.id
    });
  }

  return (
    <div className="container">
      <Text theme={[TextThemes.CAPTION]} propStyle={{color: CommonStyle.TextDarkGary}}>アイコン</Text>
      <div className="selected-icon">
        <Icon theme={[IconThemes.SELECTEDPROFILE]} ><img src={data.image ? data.image : "/profile-icon1.png"} width="80px" height="80px" style={{borderRadius: '50%'}} alt='selected profile icon'/></Icon>
      </div>
      <ul className="icons-container">
        {Array.from(Array(8).keys(), x => x+1).map(num => <li key={`icon${num}}`}><Icon key={`icon_${num}`} theme={[IconThemes.PROFILE]} onClick={handleChange} ><img src={`/profile-icon${num}.png`} width="56px" height="56px" style={{borderRadius: '50%'}} id={`/profile-icon${num}.png`} alt='profile icon'/></Icon></li>)}
      </ul>
      <style jsx>{`
        .container {
          text-align: center;
        }

        .container p {
          color: ${CommonStyle.TextDarkGary};
          margin-bottom: 16px;
        }

        .icons-container {
          padding: 1rem 2rem;
          max-width: 350px;
          margin: 0 auto;
        }

        .icons-container li {
          display: inline-block;
          margin: 0.5rem;
        }

      `}</style>

    </div>
  );
}

export default UserIconSellection;