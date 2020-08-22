import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Top } from './components/pages/Top';
import { History } from './components/pages/History';
import { CommonProvider } from "./context/CommonProvider";
import { Authentication } from "./components/common/Authentication";

import { ShopComments } from './components/pages/shop/Comments';
import { CreateComment } from './components/pages/shop/CreateComment';

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
      <CommonProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Top} />
            <Route exact path='/history' component={History} />
            <Route exact path='/shops/:id/comments' component={ShopComments} />
            <Route exact path='/accounts/:id/accounttop' component={AccountTop} />
            <Route exact path='/accounts/:id/comments' component={Comments} />
            <Route exact path='/accounts/:id/update' component={Update} />
            <Route exact path='/accounts/:id/delete' component={Delete} />
            <Route exact path='/accounts/:id/profileregister' component={ProfileRegister} />
            <Route exact path='/accounts/privacy' component={Privacy} />
            <Route exact path='/accounts/login' component={Login} />
            <Route exact path='/accounts/logout' component={Logout} />
            <Route exact path='/accounts/register' component={Register} />
            <Route exact path='/accounts/emailregister' component={EmailRegister} />
            <Route exact path='/accounts/send' component={Send} />
            <Authentication>
              <Route exact path='/shops/:id/comments/new' component={CreateComment} />
            </Authentication>
          </Switch>
        </BrowserRouter>
      </CommonProvider>
      <style jsx>{`
        
      `}</style>
    </div>
  );

}

export default App;
