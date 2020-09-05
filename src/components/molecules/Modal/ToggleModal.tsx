import React from 'react';
// library
import { Check } from 'react-feather';
import Cookies from 'universal-cookie';
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
          {shop_names.map((item: string, i: number) => (
            <React.Fragment key={`shop_name${i}`}>
              <hr className="modal-inner-hr" />
              <div className="modal-inner-item" onClick={() => {onClick(i)}}>
                {i === selectedShopIndex ?
                  <Check size={24} color={CommonStyle.AccentColor} style={{margin: 'auto 12px auto 8px'}}/>
                  :
                  <Check size={24} color={CommonStyle.AccentColor} style={{margin: 'auto 12px auto 8px', visibility: 'hidden'}}/>
                }
                <Text theme={[TextThemes.SUBTITLE]}>{item}</Text>
              </div>
            </React.Fragment>
          ))}
          <hr className="modal-inner-hr" />
          <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.btn} onClick={() => setShowState(false)}>
            キャンセル
          </Button>
        </div>
      </div>
      <style jsx>{`
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
            box-shadow: 0px 0px 5px 0px ${CommonStyle.BorderGray};
            position: fixed;
            z-index: 10000;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            text-align: center;
            background-color: ${CommonStyle.BgWhite};
            border: 1px solid ${CommonStyle.BorderGray};
            border-radius: 5px;
          }
          .modal-inner{
            padding: 20px;
          }
          .modal-inner-hr{
            width: calc(100% + 2em);
            margin: 4px 0 4px -1em;
          }
          .modal-inner-item{
            padding: 4px 0;
            display: flex;
          }
        `}</style>
    </React.Fragment>
  );
};

export default ToggleModal;