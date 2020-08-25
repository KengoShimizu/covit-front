import React from 'react';
import {CommonStyle} from './../../common/CommonStyle';

interface SubHeaderProps {
  children?: React.ReactNode;
}

export const SubHeader: React.FC<SubHeaderProps> = ({children}) => {
  return (
    <div className="sub-header">
      {children}
      <style jsx>{`
        .sub-header{
          background: ${CommonStyle.BgWhite};
          width: 100%;
          height: 40px;
          text-align: center;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}

