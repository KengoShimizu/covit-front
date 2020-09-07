import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <style jsx>
        {`
        .loading,
        .loading:after {
          border-radius: 50%;
          width: 2em;
          height: 2em;
        }
        .loading {
          // margin: 60px auto;
          font-size: 14px;
          position: fixed;
          z-index: 10000;
          left: calc(50% - 14px);
          top: 60px;
          text-indent: -9999em;
          //border
          border-top: .3em solid rgba(255, 255, 255, .5);
          border-right: .3em solid rgba(255, 255, 255, .5);
          border-bottom: .3em solid rgba(255, 255, 255, .5);
          border-left: .3em solid #DF6059;
          //transform
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation: load8 1.1s infinite linear;
          animation: load8 1.1s infinite linear;
        }
        @-webkit-keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `}
      </style>
    </div>
  );
}

export default Loading;