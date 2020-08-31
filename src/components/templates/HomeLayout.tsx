import React from 'react';
// molecules
import Header from '../molecules/Header/Header';

interface HomeLayoutProps {
  headerText?: string;
  prevRef?: string;
  children?: React.ReactNode;
  history?: any;
  onClick?: any;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({headerText, prevRef, children, history, onClick}) => {
  return (
    <div className="container">
      {history && <Header headerText={headerText} prevRef={prevRef} history={history}/>}
      {!history && <Header headerText={headerText} prevRef={prevRef}/>}
      {onClick && <Header headerText={headerText} prevRef={prevRef} onClick={onClick}/>}
      <div className="wrap">
        <main>
          {children}
        </main>
      </div>
      <style jsx>{`
        *{
          margin:0;
          padding:0;
          border:0;
          outline:0;
          list-style:none;
        }
        a{
          text-decoration: none;
        }
        .container{
          width: 100%
        }
        .wrap{
          padding-top: ${headerText ? '40px' : '0px'};
          width: 100%;
          height: ${headerText ? 'calc(100vh - 96px)' : 'calc(100vh - 56px)'};
        }
      `}</style>
    </div>
  );
}

export default HomeLayout;