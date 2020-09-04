import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from '../../../common/Const';

interface PrivacyFotterProps {
  propStyle?: any;
}

const PrivacyFotter: React.FC<PrivacyFotterProps> = ({propStyle}) => {
  return (
    <React.Fragment>
      <ul className="privacy_container" style={propStyle}>
        <Link to={RouteName.PRIVACY}><li className="privacy_text">プライバシー</li></Link>
        <li className="privacy_text">covEAT © ︎2020</li>
      </ul>
      <style jsx>{`
        .privacy_container{
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 44px;
          top: auto;
        }
        .privacy_text{
          font-weight: bold;
          font-size: 14px;
          color: #8C8C8C;
          margin-bottom: 12px;
        }
      `}</style>
    </React.Fragment>
  );
}

export default PrivacyFotter;