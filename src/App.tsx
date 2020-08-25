import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Top } from './components/pages/Top';
import { History } from './components/pages/History';
import { CommonProvider } from "./context/CommonProvider";
import { Authentication } from "./components/common/Authentication";

import { Shop } from './components/pages/shop/Shop';
import { ShopComments } from './components/pages/shop/Comments';
import { CreateComment } from './components/pages/shop/CreateComment';

import { EmailRegister } from './components/pages/account/auth/EmailRegister';
import { Login } from './components/pages/account/auth/Login';
import { Logout } from './components/pages/account/auth/Logout';
import { Send } from './components/pages/account/auth/Send';
import { ProfileRegister } from './components/pages/account/auth/ProfileRegister';
import { Register } from './components/pages/account/auth/Register';
import { Delete } from './components/pages/account/manage/Delete';
import { EditLogin } from './components/pages/account/manage/EditLogin';
import { EditProfile } from './components/pages/account/manage/EditProfile';
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
            <Route exact path='/shops/:id' component={Shop} />
            <Route exact path='/shops/:id/comments' component={ShopComments} />
            <Route exact path='/accounts/privacy' component={Privacy} />
            <Route exact path='/accounts/login' component={Login} />
            <Route exact path='/accounts/logout' component={Logout} />
            <Route exact path='/accounts/register' component={Register} />
            <Route exact path='/accounts/emailregister' component={EmailRegister} />
            <Route exact path='/accounts/send' component={Send} />
            <Route exact path='/users/:id/comments' component={Comments} />
            <Authentication>
              <Route exact path='/shops/:id/comments/new' component={CreateComment} />
              <Route exact path='/accounts' component={AccountTop} />
              <Route exact path='/accounts/comments' component={Comments} />
              <Route exact path='/accounts/editlogin' component={EditLogin} />
              <Route exact path='/accounts/editprofile' component={EditProfile} />
              <Route exact path='/accounts/delete' component={Delete} />
              <Route exact path='/accounts/profileregister' component={ProfileRegister} />
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
