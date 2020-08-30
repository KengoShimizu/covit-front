import React from 'react';
// library
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// provider
import { CommonProvider } from "./context/CommonProvider";
import { Authentication } from "./components/common/Authentication";
import { UserAuth } from "./components/common/UserAuth";
import { OwnerAuth } from "./components/common/OwnerAuth";
import { ModalStateProvider } from './context/ModalContext';
import { ModalTopStateProvider } from './context/ModalTopContext';
// components/pages
import { Top } from './components/pages/Top';
import { History } from './components/pages/History';
// components/pages/user/shop
import { Shop } from './components/pages/user/shop/Shop';
import { ShopComments } from './components/pages/user/shop/Comments';
import { CreateComment } from './components/pages/user/shop/CreateComment';
// components/pages/user/account
import { AccountTop } from './components/pages/user/account/AccountTop';
import { Privacy } from './components/pages/user/account/Privacy';
import { Comments } from './components/pages/user/account/Comments';
// components/pages/user/account/auth
import { EmailRegister } from './components/pages/user/account/auth/EmailRegister';
import { Login } from './components/pages/user/account/auth/Login';
import { Send } from './components/pages/user/account/auth/Send';
import { ProfileRegister } from './components/pages/user/account/auth/ProfileRegister';
import { Register } from './components/pages/user/account/auth/Register';
// components/pages/user/account/manage
import { Delete } from './components/pages/user/account/manage/Delete';
import { EditLogin } from './components/pages/user/account/manage/EditLogin';
import { EditProfile } from './components/pages/user/account/manage/EditProfile';
import { EditEmail } from './components/pages/user/account/manage/EditEmail';
import { AddEmail } from './components/pages/user/account/manage/AddEmail';
//Owner用 component
import { OwnerRequestTop } from './components/pages/owner/register/OwnerRequestTop';
import { OwnerShopForm } from './components/pages/owner/register/OwnerShopForm';

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
                {/* ログインの導線でどうだろ */}
                <Route exact path='/owners/requesttop' component={OwnerRequestTop} />
                <Authentication>
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
