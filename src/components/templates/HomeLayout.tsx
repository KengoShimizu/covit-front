import React from 'react';
// library
import { Helmet } from 'react-helmet';
// molecules
import Header from '../molecules/Header/Header';

interface HomeLayoutProps {
  headerText?: string;
  prevRef?: string;
  children?: React.ReactNode;
  history?: any;
  onClick?: any;
  noBtn?: boolean;
  title?: string;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({headerText, prevRef, children, history, onClick, noBtn, title}) => {
  return (
    <div className="container">
      <Helmet>
        <title>{title ? title : 'covEAT/こびイート | 感染症対策店舗検索サービス'}</title>
      </Helmet>
      {history && <Header headerText={headerText} prevRef={prevRef} history={history}/>}
      {!history && <Header headerText={headerText} prevRef={prevRef}/>}
      {onClick && <Header headerText={headerText} prevRef={prevRef} onClick={onClick}/>}
      {noBtn && <Header headerText={headerText} noBtn={noBtn}/>}
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