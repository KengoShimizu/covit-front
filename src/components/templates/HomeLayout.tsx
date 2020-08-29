import React from 'react';
// molecules
import Header from '../molecules/Header/Header';

interface HomeLayoutProps {
  subHeaderText?: string;
  prevRef?: string;
  children?: React.ReactNode;
  history?: any;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({subHeaderText, prevRef, children, history}) => {
  return (
    <div className="container">
      {history ? 
        <Header subHeaderText={subHeaderText} prevRef={prevRef} history={history}/>
        :
        <Header subHeaderText={subHeaderText} prevRef={prevRef}/>
      }
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
          padding-top: ${subHeaderText ? '0px' : '56px'};
          width: 100%;
          height: calc(100vh - 56px);
        }
      `}</style>
    </div>
  );
}

export default HomeLayout;