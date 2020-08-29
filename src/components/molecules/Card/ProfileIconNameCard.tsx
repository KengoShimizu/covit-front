import React from 'react';
// components
import Icon, { IconThemes } from './../../atoms/Icon';
import Text, { TextThemes } from './../../atoms/Text';

const propStyle = {
  accountIcon: {
    marginRight: '8px'
  }
};

interface AccoutTopCardProps {
  src: string;
  name: string;
}

const AccountTopCard: React.FC<AccoutTopCardProps> = ({src, name}) => {
  return (
    <div className="account-info_card">
      <div className="account-info_profile">
        {/* FIXME IconThemes.COVIDMEASURE*/}
        <Icon theme={[IconThemes.PROFILE]} propStyle={propStyle.accountIcon}>
          <img className="account-info_profile-icon" src={src} alt=""/>
        </Icon>
        <Text theme={[TextThemes.CAPTION]}> 
          {name}
        </Text>
      </div>
      <style jsx>{`
        .account-info_card{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px;
          margin: 9px 0 40px;
        }
        .account-info_profile{
          display: flex;
          align-items: center;
        }
        .account-info_profile-icon{
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default AccountTopCard;