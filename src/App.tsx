import React from 'react';
// library
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// const
import { RouteName } from './common/Const';
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
import { Register } from './components/pages/user/account/auth/Register';
// components/pages/user/account/manage
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
                    <Route exact path={RouteName.ROOT} component={Top} />
                    <Route exact path={RouteName.MENU} component={Menu} />
                    <Route exact path={RouteName.SHOP} component={Shop} />
                    <Route exact path={RouteName.SHOP_COMMENTS} component={ShopComments} />
                    <Route exact path={RouteName.PRIVACY} component={Privacy} />
                    <Route exact path={RouteName.LOGIN} component={Login} />
                    <Route exact path={RouteName.REGISTER} component={Register} />
                    <Route exact path={RouteName.REGISTER_EMAIL} component={EmailRegister} />
                    <Route exact path={RouteName.SEND} component={Send} />
                    <Route exact path={RouteName.USER_COMMENTS} component={Comments} />
                    <Route exact path={RouteName.REQUEST_TOP} component={OwnerRequestTop} />
                    <Authentication>
                      <UserRoute exact path={RouteName.COMMENTS_NEW} component={CreateComment} />
                      <UserRoute exact path={RouteName.SHOP_SEARCH_FOR_COMMENTS} component={CommentPrepare} />
                      <OwnerRoute exact path={RouteName.OWNER_SHOP_FORM} component={OwnerShopForm} />
                      <Route exact path={RouteName.HISTORY} component={History} />
                      <Route exact path={RouteName.ACCOUNT_TOP} component={AccountTop} />
                      <Route exact path={RouteName.SELF_COMMENTS} component={Comments} />
                      <Route exact path={RouteName.EDIT_LOGIN} component={EditLogin} />
                      <Route exact path={RouteName.EDIT_PROFILE} component={EditProfile} />
                      <Route exact path={RouteName.EDIT_EMAIL} component={EditEmail} />
                      <Route exact path={RouteName.ADD_EMAIL} component={AddEmail} />
                      <Route exact path={RouteName.USER_SHOP_FORM} component={UserShopForm} />
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