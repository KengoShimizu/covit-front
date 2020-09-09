import React from 'react';
// common
import CommonStyle from '../../../common/CommonStyle';
import { Link } from 'react-router-dom';
// library
import { CheckCircle } from 'react-feather';
// components
import Icon, { IconThemes } from '../../atoms/Icon';
import Text, { TextThemes } from '../../atoms/Text';

const propStyle = {
  loginIcon: {
    margin: 'auto 16px auto auto'
  }
}
interface LoginFlexCardProps {
  src: string;
  text: string;
  nextRef?: string;
  loginWay?: boolean;
}

const LoginFlexCard: React.FC<LoginFlexCardProps> = ({ src, text, nextRef = '#', loginWay }) => {
  return (
    <li className="login-card">
      <div className="login-card_content">
        <span className="login-card_check-box">
          {loginWay &&
            <CheckCircle size={14} color={CommonStyle.AccentColor} />
          }
        </span>
        <Icon theme={[IconThemes.SMALL]} propStyle={propStyle.loginIcon}>
          <img className="login-card_img" src={src} alt="" />
        </Icon>
        <Text theme={[TextThemes.CAPTION]}>
          {text}
        </Text>
      </div>
      {text === 'メールアドレス' && loginWay &&
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
          margin: auto 10px auto auto;
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