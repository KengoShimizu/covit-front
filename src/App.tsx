import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Top } from './components/pages/Top';
import { History } from './components/pages/History';
import { CommonProvider } from "./context/CommonProvider";
import { Authentication } from "./components/common/Authentication";
import { ModalStateProvider } from './context/ModalContext';
import { ModalTopStateProvider } from './context/ModalTopContext';

import { Shop } from './components/pages/user/shop/Shop';
import { ShopComments } from './components/pages/user/shop/Comments';
import { CreateComment } from './components/pages/user/shop/CreateComment';

import { EmailRegister } from './components/pages/user/account/auth/EmailRegister';
import { Login } from './components/pages/user/account/auth/Login';
import { Send } from './components/pages/user/account/auth/Send';
import { ProfileRegister } from './components/pages/user/account/auth/ProfileRegister';
import { Register } from './components/pages/user/account/auth/Register';
import { Delete } from './components/pages/user/account/manage/Delete';
import { EditLogin } from './components/pages/user/account/manage/EditLogin';
import { EditProfile } from './components/pages/user/account/manage/EditProfile';
import { EditEmail } from './components/pages/user/account/manage/EditEmail';
import { AddEmail } from './components/pages/user/account/manage/AddEmail';
import { AccountTop } from './components/pages/user/account/AccountTop';
import { Privacy } from './components/pages/user/account/Privacy';
import { Comments } from './components/pages/user/account/Comments';

//Owner用 component
//import { OwnerRequestTop } from './components/pages/owner/register/OwnerRequestTop';
//import { OwnerShopForm } from './components/pages/owner/register/OwnerShopForm';

function App() {
  return (
    <div className="App">
      <CommonProvider>
        <ModalStateProvider>
          <ModalTopStateProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' component={Top} />
                <Route exact path='/history' component={History} />
                <Route exact path='/shops/:id' component={Shop} />
                <Route exact path='/shops/:id/comments' component={ShopComments} />
                <Route exact path='/accounts/privacy' component={Privacy} />
                <Route exact path='/accounts/login' component={Login} />
                <Route exact path='/accounts/register' component={Register} />
                <Route exact path='/accounts/emailregister' component={EmailRegister} />
                <Route exact path='/accounts/send' component={Send} />
                <Route exact path='/users/:id/comments' component={Comments} />
                {/* ここ普通のユーザーもいけていいの？オーナーのユーザー登録も同時にやるのは仕組み的にどうなんだろ */}
                {/*<Route exact path='/owners/requesttop' component={OwnerRequestTop} />*/}
                {/*<Route exact path='/owners/shopform' component={OwnerShopForm} />*/}
                <Authentication>
                  <Route exact path='/shops/:id/comments/new' component={CreateComment} />
                  <Route exact path='/accounts' component={AccountTop} />
                  <Route exact path='/accounts/comments' component={Comments} />
                  <Route exact path='/accounts/editlogin' component={EditLogin} />
                  <Route exact path='/accounts/editprofile' component={EditProfile} />
                  <Route exact path='/accounts/editemail' component={EditEmail} />
                  <Route exact path='/accounts/addemail' component={AddEmail} />
                  <Route exact path='/accounts/delete' component={Delete} />
                  <Route exact path='/accounts/profileregister' component={ProfileRegister} />
                </Authentication>
              </Switch>
            </BrowserRouter>
          </ModalTopStateProvider>
        </ModalStateProvider>
      </CommonProvider>
      <style jsx>{`
        
      `}</style>
    </div>
  );

}

export default App;
