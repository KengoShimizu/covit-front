import React from 'react';
// library
import { Check } from 'react-feather';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Text, { TextThemes } from '../../atoms/Text';
import Button, { ButtonThemes } from '../../atoms/Button';

const propStyle = {
  title: {
    marginBottom: '8px'
  },
  btn: {
    margin: '32px auto 0px auto'
  }
}

interface ToggleModalProps {
  shop_names: string[];
  setShowState: any;
  showState: boolean;
  selectedShopIndex: number;
  onClick: any;
}

const ToggleModal: React.FC<ToggleModalProps> = ({ shop_names, setShowState, showState, selectedShopIndex, onClick }) => {
  // スクロールの固定
  if (showState) {
    document.body.setAttribute('style', 'overflow: hidden;')
  } else {
    document.body.removeAttribute('style')
  }

  return (
    <React.Fragment>
      <div className="modal-background" onClick={() => setShowState(false)}></div>
      <div className='modal-container'>
        <div className='modal-inner'>
          <Text theme={[TextThemes.SUBTITLE]} propStyle={propStyle.title}>お店の切り替え</Text>
          <div className="scroll-inner">
            {shop_names?.map((item: string, i: number) => (
              <React.Fragment key={`shop_name${i}`}>
                <hr className="modal-inner-hr" />
                <div className="modal-inner-item" onClick={() => { onClick(i) }}>
                  {i === selectedShopIndex ?
                    <Check size={24} color={CommonStyle.AccentColor} style={{ margin: 'auto 12px auto 8px' }} />
                    :
                    <Check size={24} color={CommonStyle.AccentColor} style={{ margin: 'auto 12px auto 8px', visibility: 'hidden' }} />
                  }
                  <Text theme={[TextThemes.SUBTITLE]}>{item}</Text>
                </div>
              </React.Fragment>
            ))}
            <hr className="modal-inner-hr" />
          </div>
          <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.btn} onClick={() => setShowState(false)}>
            キャンセル
          </Button>
        </div>
      </div>
      <style jsx>{`
        .scroll-inner {
          height: 240px;
          width: 100%;
          overflow-y: scroll;
        }

        .scroll-inner::-webkit-scrollbar{ 
          width: 10px;
        }
        .scroll-inner::-webkit-scrollbar-thumb{ 
          background: #c1c1c1;
        }
        .scroll-inner::-webkit-scrollbar-track-piece:start{
          background: #f1f1f1;
        }
        .scroll-inner::-webkit-scrollbar-track-piece:end{
          background: #f1f1f1;
        }

        .modal-background{
          position: fixed;
          top: 40px;
          width: 100%;
          height: 100%;
          z-index: 9999;
          background-color: rgba(0,0,0,.15);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .modal-container{
          overflow-y: scroll;
          max-height: 400px;
          max-width: 500px;
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
          position: fixed;
          z-index: 10000;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          text-align: center;
          background-color: ${CommonStyle.BgWhite};
          border: 1px solid ${CommonStyle.BorderGray};
          border-radius: 4px;
        }
        .modal-inner{
          padding: 20px;
        }
        .modal-inner-hr{
          margin: 4px 0 4px -1em;
        }
        .modal-inner-item{
          cursor: pointer;
          padding: 4px 0;
          display: flex;
        }
      `}</style>
    </React.Fragment>
  );
};

export default ToggleModal;