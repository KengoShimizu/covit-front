import React from 'react';
// library
import { Link } from 'react-router-dom';
// components
import Icon, { IconThemes } from '../../atoms/Icon';

const propStyle = {
  icon: {
    width: '44px',
    height: '28px',
    marginBottom: '8px'
  }
}

interface FotterActionItemProps {
  icon: any;
  nextRef: string;
  caption: string;
}

const FotterActionItem: React.FC<FotterActionItemProps> = ({ icon, nextRef, caption }) => {
  return (
    <div className="footer-action-item">
      <Link to={nextRef}>
        <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.icon}>
          {icon}
        </Icon>
        <p className="footer-action-item_caption"> 
          {caption}
        </p>
      </Link>
      <style jsx>{`
        .footer-action-item{
          width: 44px;
          height: 44px;
        }
        .footer-action-item_caption{
          font-size: 8px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default FotterActionItem;