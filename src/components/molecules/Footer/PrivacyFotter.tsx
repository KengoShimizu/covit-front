import React from 'react';

const PrivacyFotter: React.FC = () => {
  return (
    <React.Fragment>
      <ul className="privacy_container">
        <li className="privacy_text">プライバシー</li>
        <li className="privacy_text">サービス名 © ︎2020</li>
      </ul>
      <style jsx>{`
        .privacy_container{
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 48px;
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