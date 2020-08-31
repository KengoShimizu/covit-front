import React, { useContext } from 'react';
// library
import ReactDOM from 'react-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Text, { TextThemes } from '../../atoms/Text';
// context
import { TopModalContextIsShown, TopModalContextText } from '../../../context/TopModalContext';

const propStyle = {
  text: {
    color: CommonStyle.BgWhite,
  }
}

const TopModal: React.FC = () => {
  const renderModal = (isTopModalShown: boolean, setIsTopModalShown: any, modalText: any) => {
    setTimeout(() => {
      setIsTopModalShown(false)
    }, 2500)
    return (
      <div className={isTopModalShown ? 'modal-top-container show' : 'modal-top-container'}>
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
  const TopModal_isShownContext = useContext(TopModalContextIsShown);
  const TopModal_textContext = useContext(TopModalContextText);

  const TopModalElement: any = document.getElementById('modal-top');
  return ReactDOM.createPortal(
    renderModal(
      TopModal_isShownContext.isTopModalShown,
      TopModal_isShownContext.setIsTopModalShown, 
      TopModal_textContext.modalText),
    TopModalElement
  );

};

export default TopModal;