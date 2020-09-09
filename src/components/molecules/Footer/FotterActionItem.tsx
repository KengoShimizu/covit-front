import React from 'react';
// library
import { Link } from 'react-router-dom';

interface FotterActionItemProps {
  id: string;
  text: string;
  svg: React.ReactNode;
  svgSize: number;
  svgSizeHeight?: number;
  nextRef: string;
  onClick: any;
  isFocus: string;
}

const FotterActionItem: React.FC<FotterActionItemProps> = ({ svg, svgSize, svgSizeHeight, nextRef, onClick, isFocus, id, text}) => {
  return (
    <li className={`footer-action-bar_option ${isFocus}`} id={id} onClick={onClick}>
      <Link to={nextRef}>
        <div className="footer-action-bar_btn">
          <span className="footer-action-bar_icon-wrapper">
            <svg className={`footer-action-bar_icon ${isFocus}`} width={svgSize} height={svgSizeHeight ? svgSizeHeight : svgSize} viewBox={`0 0 ${svgSize} ${svgSizeHeight ? svgSizeHeight : svgSize}`} fill="none" xmlns="http://www.w3.org/2000/svg">
              {svg}
            </svg>
          </span>
          <p className={`footer-action-bar_caption ${isFocus}`}>{text}</p>
        </div>
      </Link>
      <style jsx>{`
        .footer-action-bar_option{
          margin-right: 16px;
        }
        .footer-action-bar_btn{
          width: 44px;
          height: 44px;
        }
        .footer-action-bar_icon-wrapper{
          height: 28px;
          width: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4px;
        }
        .footer-action-bar_icon{
          width: auto;
          stroke: #8C8C8C;
        }
        .footer-action-bar_caption{
          font-size: 8px;
          text-align: center;
          font-weight: bold;
          color: #8C8C8C;
        }
        
        .footer-action-bar_icon._clicked{
          stroke: #DF6059;
        }
        .footer-action-bar_caption._clicked{
          color: #DF6059;
        }
        
      `}</style>
    </li>
  );
}

export default FotterActionItem;