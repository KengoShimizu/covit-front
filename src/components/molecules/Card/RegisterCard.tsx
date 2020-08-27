import React, { useState } from 'react';
import {CommonStyle} from '../../../common/CommonStyle';
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';

const propStyle = {
  registerCardIcon: {
    //margin: 'auto',
  },
  registerCardText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    width: '200px',
  }
}

interface RegisterCardProps {
  src: string;
  text: string;
  className: string;
}

export const RegisterCard: React.FC<RegisterCardProps> = ({src, text, className}) => {
  return (
    <div className={`register-card ${className}`}>
      <div className="register-card-inner">
        <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.registerCardIcon}>
          <img className="register-card-image" src={src} alt=""/>
        </Icon>
        <Text theme={[TextThemes.SMALL]} propStyle={propStyle.registerCardText}>
          {text}
        </Text>
      </div>
      <style jsx>{`
        .register-card {
          position: relative;
          border-radius: 4px;
          text-align: center;
          background: ${CommonStyle.BgWhite};
          height: 38px;
          width: 320px;
          box-sizing: border-box;
          margin: 16px auto;
        }
        .register-card-inner {
          padding: 5px;
          display: flex;
        }
        .register-card-image {
          width: 100%;
          height: auto;
        }
        .twitter{
          border: 2px solid ${CommonStyle.TwitterColor};
        }
        .google{
          border: 2px solid ${CommonStyle.GoogleColor};
        }
        .facebook{
          border: 2px solid ${CommonStyle.FacebookColor};
        }
        .email{
          border: 2px solid ${CommonStyle.BorderGray};
        }
      `}</style>
    </div>
  );
}

