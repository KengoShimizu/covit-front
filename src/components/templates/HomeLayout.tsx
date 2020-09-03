import React from 'react';
// molecules
import Header from '../molecules/Header/Header';

interface HomeLayoutProps {
  headerText?: string;
  prevRef?: string;
  children?: React.ReactNode;
  history?: any;
  onClick?: any;
  noBtn?: boolean;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({headerText, prevRef, children, history, onClick, noBtn}) => {
  return (
    <div className="container">
      {history && <Header headerText={headerText} prevRef={prevRef} history={history}/>}
      {!history && <Header headerText={headerText} prevRef={prevRef}/>}
      {onClick && <Header headerText={headerText} prevRef={prevRef} onClick={onClick}/>}
      {noBtn && <Header headerText={headerText} prevRef={prevRef} noBtn={noBtn}/>}
      <div className="wrap">
        <main>
          {children}
        </main>
      </div>
      <style jsx>{`
        .container{
          width: 100%;
          height: 100%;
        }
        .wrap{
          padding-top: ${headerText ? '40px' : '0px'};
          width: 100%;
          height: ${headerText ? 'calc(100% - 96px)' : 'calc(100% - 56px)'};
        }
      `}</style>
    </div>
  );
}

export default HomeLayout;