import React, { useContext } from 'react';
// library
import ReactDOM from 'react-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Text, { TextThemes } from '../../atoms/Text';
// context
import { ModalTopContextIsShown, ModalTopContextText } from '../../../context/ModalTopContext';

const propStyle = {
  text: {
    color: CommonStyle.BgWhite,
  }
}

const ModalTop: React.FC = () => {
  const renderModal = (isModalTopShown: boolean, setIsModalTopShown: any, modalText: any) => {
    setTimeout(() => {
      setIsModalTopShown(false)
    }, 2500)
    return (
      <div className={isModalTopShown ? 'modal-top-container show' : 'modal-top-container'}>
        <div className='modal-top-inner'>
          <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.text}>{modalText.caption}</Text>
          {modalText.small &&
            <Text theme={[TextThemes.SMALL]} propStyle={propStyle.text}>{modalText.small}</Text>
          }
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
  const modalTop_isShownContext = useContext(ModalTopContextIsShown);
  const modalTop_textContext = useContext(ModalTopContextText);

  const modalTopElement: any = document.getElementById('modal-top');
  return ReactDOM.createPortal(
    renderModal(
      modalTop_isShownContext.isModalTopShown,
      modalTop_isShownContext.setIsModalTopShown, 
      modalTop_textContext.modalText),
    modalTopElement
  );

};

export default ModalTop;