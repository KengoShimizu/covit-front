import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalTopContext_isShown, ModalTopContext_text } from '../../../context/ModalTopContext';
import Text, { TextThemes } from '../../atoms/Text';
import { CommonStyle } from '../../../common/CommonStyle';

const propStyle = {
  text: {
    color: CommonStyle.BgWhite,
  }
}

export const ModalTop: React.FC = () => {
  const renderModal = (isModalTopShown: boolean, setIsModalTopShown: any, modalText: string) => {
    setTimeout(() => {
      setIsModalTopShown(false)
    }, 2500)
    return (
      <div className={isModalTopShown ? 'modal-top-container show' : 'modal-top-container'}>
        <div className='modal-top-inner'>
          <Text theme={[TextThemes.SMALL]} propStyle={propStyle.text}>{modalText}</Text>
        </div>
        <style jsx>{`
          .modal-top-container{
            position: absolute;
            top: -100px;
            z-index: 1001;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            text-align: center;
            background-color: ${CommonStyle.AccentColor};
            border-radius: 4px;
            transition-duration: .5s;
          }
          .modal-top-inner{
            padding: 14px;
          }
          .show{
            top: 66px;
          }
        `}</style>
      </div>
    );
  };

  // Contextの値を取得して開閉制御
  const modalTop_isShownContext = useContext(ModalTopContext_isShown);
  const modalTop_textContext = useContext(ModalTopContext_text);

  const modalTopElement: any = document.getElementById('modal-top');
  return ReactDOM.createPortal(
    renderModal(
      modalTop_isShownContext.isModalTopShown,
      modalTop_isShownContext.setIsModalTopShown, 
      modalTop_textContext.modalText),
    modalTopElement
  );

};