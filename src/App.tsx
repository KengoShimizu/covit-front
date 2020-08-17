import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Top } from './components/pages/Top';
import { History } from './components/pages/History';

import { Comment } from './components/pages/shop/Comment';
import { Reputations } from './components/pages/shop/Reputations';

import { EmailRegister } from './components/pages/account/auth/EmailRegister';
import { Login } from './components/pages/account/auth/Login';
import { Logout } from './components/pages/account/auth/Logout';
import { Send } from './components/pages/account/auth/Send';
import { ProfileRegister } from './components/pages/account/auth/ProfileRegister';
import { Register } from './components/pages/account/auth/Register';
import { Delete } from './components/pages/account/manage/Delete';
import { Update } from './components/pages/account/manage/Update';
import { AccountTop } from './components/pages/account/AccountTop';
import { Privacy } from './components/pages/account/Privacy';
import { Comments } from './components/pages/account/Comments';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>yarn
          <Route exact path='/' component={Top}/>
          <Route exact path='/history' component={History}/>
          <Route exact path='/shops/:id/reputations' component={Reputations}/>
          <Route exact path='/shops/:id/comment' component={Comment}/>
          <Route exact path='/accounts/:id/accounttop' component={AccountTop}/>
          <Route exact path='/accounts/:id/comments' component={Comments}/>
          <Route exact path='/accounts/:id/update' component={Update}/>
          <Route exact path='/accounts/:id/delete' component={Delete}/>
          <Route exact path='/accounts/:id/profileregister' component={ProfileRegister}/>
          <Route exact path='/accounts/privacy' component={Privacy}/>
          <Route exact path='/accounts/login' component={Login}/>
          <Route exact path='/accounts/logout' component={Logout}/>
          <Route exact path='/accounts/register' component={Register}/>
          <Route exact path='/accounts/emailregister' component={EmailRegister}/>
          <Route exact path='/accounts/send' component={Send}/>
        </Switch>
      </BrowserRouter>
      <style jsx>{`
        /* リセットCSS */
        * {
            margin:0;
            padding:0;
            border:0;
            outline:0;
            font-size:100%;
            vertical-align:baseline;
            background:transparent;
        }

        body {
            line-height:1;
        }

        article,aside,details,figcaption,figure,
        footer,header,hgroup,menu,nav,section {
            display:block;
        }

        nav,ul,ol,li {
            list-style:none;
        }

        blockquote, q {
              quotes:none;
          }

          blockquote:before, blockquote:after,
          q:before, q:after {
              content:'';
              content:none;
          }

          a {
              margin:0;
              padding:0;
              font-size:100%;
              vertical-align:baseline;
              background:transparent;
          }

          /* change colours to suit your needs */
          ins {
              background-color:#ff9;
              color:#000;
              text-decoration:none;
          }

          /* change colours to suit your needs */
          mark {
              background-color:#ff9;
              color:#000;
              font-style:italic;
              font-weight:bold;
          }

          del {
              text-decoration: line-through;
          }

          abbr[title], dfn[title] {
              border-bottom:1px dotted;
              cursor:help;
          }

          table {
              border-collapse:collapse;
              border-spacing:0;
          }

          /* change border colour to suit your needs */
          hr {
              display:block;
              height:1px;
              border:0;  
              border-top:1px solid #cccccc;
              margin:1em 0;
              padding:0;
          }

          input, select {
              vertical-align:middle;
          }
      `}</style>
    </div>
  );

}

export default App;
