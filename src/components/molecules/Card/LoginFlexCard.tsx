import React from 'react';
// common
import CommonStyle from '../../../common/CommonStyle';
import { Link } from 'react-router-dom';
// components
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';

const propStyle = {
  loginIcon: {
    marginRight: '16px',
  }
}
interface LoginFlexCardProps {
  src: string;
  text: string;
  nextRef?: string;
}

const LoginFlexCard: React.FC<LoginFlexCardProps> = ({ src, text, nextRef = '#' }) => {
  return (
    <li className="login-card">
      <div className="login-card_content">
        <span className="login-card_check-box">

        </span>
        <Icon theme={[IconThemes.SMALL]} propStyle={propStyle.loginIcon}>
          <img className="login-card_img" src={src} alt="" />
        </Icon>
        <Text theme={[TextThemes.CAPTION]}>
          {text}
        </Text>
      </div>
      {text === 'メールアドレス' &&
        <Link to={nextRef}>
          <button className="login-card_btn">
            変更する
          </button>
        </Link>
      }
      <style jsx>{`
        .login-card{
          display: flex;
          align-items: center;
          box-sizing: border-box;
          margin-bottom: 16px;
          justify-content: space-between;
          padding: 0 28px;
        }
        .login-card_content{
          display: flex;
          alignf-items: center;
        }
        .login-card_img{
          width: 100%;
          height: auto;
        }
        .login-card_check-box{
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }
        .login-card_btn{
          font-weight: bold;
          font-size: 14px;
          color: ${CommonStyle.TextDarkGary}
        }
      `}</style>
    </li>
  );
}

export default LoginFlexCard;