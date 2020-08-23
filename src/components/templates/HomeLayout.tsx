import React from 'react';
import { Header } from '../organisms/Header';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({children}) => {
  return (
    <div className="container">
      <Header/>
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
      `}</style>
    </div>
  );
}

