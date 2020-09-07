import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import CommonStyle from '../../../../common/CommonStyle';


// LP
const About: React.FC = (props: any) => {
  return (
    <HomeLayout headerText="LP" prevRef='#' history={props.history}>
      <ol　className="list">
        <li className="option">
          <a href="" className="anchor">
            <p className="icon">
            </p>
            <p className="title">名前</p>
            <p className="text">本文のテキスト</p>
          </a>
        </li>
      </ol>
      <style jsx>{`
        .mail-form{
          max-width: 324px;
          width: 90%;
          margin: 40px auto 0;
        }
        .list{
          background: ${CommonStyle.BgGray};
          padding: 8px;
          width: 90%;
          margin: 0 auto;
        }
        .anchor{
          align-items: flex-start;
          display: flex;
          text-decoration: none;
        }
        .icon{
          width: 40px;
          height: 40px;
          background: gray;
        }
      `}</style>
    </HomeLayout>
  );
}

export default About;