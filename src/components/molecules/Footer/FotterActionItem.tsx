import React from 'react';
// library
import { Link } from 'react-router-dom';
// components
import Icon, { IconThemes } from '../../atoms/Icon';

const propStyle = {
  icon: {
    width: '100%',
    height: 'auto',
  }
}

interface FotterActionItemProps {
  icon: any;
  nextRef: string;
  style?: any;
}

const FotterActionItem: React.FC<FotterActionItemProps> = ({ icon, nextRef, style }) => {
  return (
    <div className="footer-action-item" style={style}>
      <Link to={nextRef}>
        <Icon theme={[IconThemes.NORMAL]} propStyle={propStyle.icon}>{icon}</Icon>
      </Link>
      <style jsx>{`
        .footer-action-item{
          padding: 9px 12px;
        }
      `}</style>
    </div>
  );
}

export default FotterActionItem;