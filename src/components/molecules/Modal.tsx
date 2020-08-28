import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from '../../context/ModalContext';
import Text, { TextThemes } from './../atoms/Text';
import Button, { ButtonThemes } from './../atoms/Button';
import { CommonStyle } from './../../common/CommonStyle';

const propStyle = {
  title: {
    marginBottom: '15px'
  },
  subTitle: {
    textAlign: 'left',
  },
  btn: {
    marginTop: '35px',
    width: '40%',
  }
}

interface ModalProps {
  title: string;
  subtitle?: string;
  btntext: string;
  onClick: any;
}

export const Modal: React.FC<ModalProps> = ({title, subtitle, btntext, onClick}) => {
  const renderModal = (modalHookState: any) => {
    const changeShownModal = modalHookState;
    let propsOnClick = onClick;
    onClick = () => {
      propsOnClick();
      changeShownModal(false);
    }
    return (
      <React.Fragment>
        <div className="modal-background" onClick={() => changeShownModal(false)}></div>
        <div className='modal-container'>
          <div className='modal-inner'>
            <Text theme={[TextThemes.SUBTITLE]} propStyle={propStyle.title}>{title}</Text>
            {subtitle && <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.subTitle}>{subtitle}</Text>}
            <div className="modal-btns">
              <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={propStyle.btn} onClick={() => changeShownModal(false)}>
                キャンセル
              </Button>
              <Button theme={[ButtonThemes.NORMAL]} propStyle={propStyle.btn} onClick={onClick}>
                {btntext}
              </Button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .modal-background{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 9999;
          }
          .modal-container{
            box-shadow: 0px 0px 5px 0px ${CommonStyle.BorderGray};
            position: absolute;
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
          .modal-btns{
            display: flex;
            justify-content: space-evenly;
          }
        `}</style>
      </React.Fragment>
    );
  };

  // Contextの値を取得して開閉制御
  const modalHookState = useContext(ModalContext);

  const modalElement: any = document.getElementById('modal');
  return ReactDOM.createPortal(
    modalHookState.isModalShown && renderModal(modalHookState.toggleModalShown),
    modalElement
  );

};