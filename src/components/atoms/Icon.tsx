import React from 'react';

interface IconProps {
  theme?: IconThemes[];
  children?: React.ReactNode;
  propStyle?: {};
  onClick?: any;
}

export enum IconThemes {
  INIT            = 'INIT',
  NORMAL          = 'NORMAL',
  SMALL           = 'SMALL',
  LITTLE           = 'LITTLE',
  LERGE           = 'LERGE',
  COVIDMEASURE    = 'COVIDMEASURE',
  PROFILE         = 'PROFILE',
  SELECTEDPROFILE = 'SELECTEDPROFILE',
  LIST            = 'LIST',
}

enum ModifierClassNames {
  INIT            = 'icon-init',
  NORMAL          = 'icon-wrapper_normal',
  SMALL           = 'icon-wrapper_small',
  LITTLE           = 'icon-wrapper_little',
  LERGE           = 'icon-wrapper_lerge',
  COVIDMEASURE    = 'infection-control_icon-wrapper',
  PROFILE         = 'profile-icon-wrapper',
  SELECTEDPROFILE = 'profile-icon-wrapper_selected',
  LIST            = 'profile-icon-wrapper_list',
}

const Icon: React.FC<IconProps> = ({theme = [IconThemes.INIT], children, propStyle = {}, onClick}) => {
  const modifierClasses = theme?.map(data => ModifierClassNames[data]).join(' ');
  return (
    <p 
      onClick={onClick}
      className={["icon_wrapper", modifierClasses].join(' ')} style={propStyle}
      >
      {children}
      <style jsx>
        {`
          .icon_wrapper{
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .icon-wrapper_lerge{
            width: 40px;
            height: 40px;
          }
          .icon-wrapper_normal{
            width: 24px;
            height: 24px;
          }
          .icon-wrapper_little{
            width: 20px;
            height: 20px;
          }
          .icon-wrapper_small{
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
          .infection-control_icon-wrapper{
            width: 60px;
            height: 60px;
            border-radius: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          //コメントリストで表示されるアイコン
          .profile-icon-wrapper_list{
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          //プロフィール変更の選択肢・ユーザー情報のアイコン
          .profile-icon-wrapper{
            display: inline-block;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            overflow: hidden;
          }
          //プロフィール変更で選択中のアイコン
          .profile-icon-wrapper_selected{
            display: inline-block;
            width: 80px;
            height: 80px;
            overflow: hidden;
          }
        `}
      </style>
    </p>
  );
}

export default Icon;