import React from 'react';

/* FIXME ざわちゃんにcssでローディングアニメーション作ってもらう */
const Loading: React.FC = () => {
  return (
    <div className="loading">
      <style jsx>
        {`
        .loading{
          height: 100px;
          width: 100px;
          background-color: black;
          z-index: 1000;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
        }
      `}
      </style>
    </div>
  );
}

export default Loading;