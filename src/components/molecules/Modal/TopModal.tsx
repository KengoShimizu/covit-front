import React, { useContext } from 'react';
// library
import ReactDOM from 'react-dom';
// common
import CommonStyle from '../../../common/CommonStyle';
// components
import Text, { TextThemes } from '../../atoms/Text';
// context
import TopModalContext from '../../../context/TopModalContext';

const propStyle = {
  text: {
    color: CommonStyle.BgWhite,
  }
}

const TopModal: React.FC = () => {

  const renderModal = (isShown: boolean, text: any) => {
    return (
      <div className={isShown ? 'modal-top-container show' : 'modal-top-container'}>
        <div className='modal-top-inner'>
          <Text theme={[TextThemes.CAPTION]} propStyle={propStyle.text}>{text.caption}</Text>
          {text.small &&
            <Text theme={[TextThemes.SMALL]} propStyle={propStyle.text}>{text.small}</Text>
          }
        </div>
        <style jsx>{`
          .modal-top-container{
            position: fixed;
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
            top: 35px;
          }
        `}</style>
      </div>
    );
  };

  // Contextの値を取得して開閉制御
  const topModalContext = useContext(TopModalContext);

  const TopModalElement: any = document.getElementById('modal-top');
  return ReactDOM.createPortal(
    renderModal(
      topModalContext.contents.isShown,
      topModalContext.contents.text),
    TopModalElement
  );

};

export default TopModal;