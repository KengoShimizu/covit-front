import React from 'react';
// library
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// provider
import { CommonProvider } from "./context/CommonProvider";
import { ModalStateProvider } from './context/ModalContext';
import { TopModalStateProvider } from './context/TopModalContext';
import { Authentication } from "./components/common/Authentication";
import { LoginJudge } from "./components/common/LoginJudge";
import { OwnerRoute } from './components/common/OwnerRoute';
import { UserRoute } from './components/common/UserRoute';
import { RedirectPathProvider } from './context/RedirectContext';
// components/pages
import { Top } from './components/pages/Top';
import { Menu } from './components/pages/Menu';
import { History } from './components/pages/History';
// components/pages/user/shop
import { Shop } from './components/pages/user/shop/Shop';
import { ShopComments } from './components/pages/user/shop/Comments';
import { CreateComment } from './components/pages/user/shop/CreateComment';
import { CommentPrepare } from './components/pages/user/shop/CommentPrepare';
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

// components/pages/owner/register
import { UserShopForm } from './components/pages/user/register/UserShopForm';
import { OwnerRequestTop } from './components/pages/owner/register/OwnerRequestTop';
import { OwnerShopForm } from './components/pages/owner/register/OwnerShopForm';

function App() {
  return (
    <div className="App">
      <CommonProvider>
        <ModalStateProvider>
          <TopModalStateProvider>
            <BrowserRouter>
              <LoginJudge>
                <RedirectPathProvider>
                  <Switch>
                    <Route exact path='/' component={Top} />
                    <Route exact path='/menu' component={Menu} />
                    <Route exact path='/shops/:id' component={Shop} />
                    <Route exact path='/shops/:id/comments' component={ShopComments} />
                    <Route exact path='/accounts/privacy' component={Privacy} />
                    <Route exact path='/accounts/login' component={Login} />
                    <Route exact path='/accounts/register' component={Register} />
                    <Route exact path='/accounts/emailregister' component={EmailRegister} />
                    <Route exact path='/accounts/send' component={Send} />
                    <Route exact path='/users/:id/comments' component={Comments} />
                    <Route exact path='/owners/requesttop' component={OwnerRequestTop} />
                    <Authentication>
                      <UserRoute exact path='/shops/:id/comments/new' component={CreateComment} />
                      <UserRoute exact path='/comments/shop_search' component={CommentPrepare} />
                      <OwnerRoute exact path='/owners/shopform' component={OwnerShopForm} />
                      <Route exact path='/history' component={History} />
                      <Route exact path='/accounts' component={AccountTop} />
                      <Route exact path='/accounts/comments' component={Comments} />
                      <Route exact path='/accounts/editlogin' component={EditLogin} />
                      <Route exact path='/accounts/editprofile' component={EditProfile} />
                      <Route exact path='/accounts/editemail' component={EditEmail} />
                      <Route exact path='/accounts/addemail' component={AddEmail} />
                      <Route exact path='/accounts/delete' component={Delete} />
                      <Route exact path='/accounts/profileregister' component={ProfileRegister} />
                      <Route exact path='/users/shopform' component={UserShopForm} />
                    </Authentication>
                  </Switch>
                </RedirectPathProvider>
              </LoginJudge>
            </BrowserRouter>
          </TopModalStateProvider>
        </ModalStateProvider>
      </CommonProvider>
      <style jsx>{`
        
      `}</style>
    </div>
  );

}

export default App;