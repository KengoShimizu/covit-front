import React from 'react';
// library
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// common
import { RouteName } from './common/Const';
// provider
import { CommonProvider } from "./context/CommonProvider";
import { ModalStateProvider } from './context/ModalContext';
import { TopModalProvider } from './context/TopModalContext';
import { Authentication } from "./components/common/Authentication";
import { LoginJudge } from "./components/common/LoginJudge";
import { OwnerRoute } from './components/common/OwnerRoute'; // 店のオーナーのみ
import { UserRoute } from './components/common/UserRoute'; // 一般ユーザーのみ
import { NotOwnerRoute } from './components/common/NotOwnerRoute'; // 一般ユーザーとゲストのみ
import { RedirectPathProvider } from './context/RedirectContext';
// pages
import Top from './components/pages/Top';
import Menu from './components/pages/Menu';
import NotFound from './components/pages/NotFound';
// common/account
import EditProfile from './components/pages/user/account/auth/EditProfile';
import EditEmail from './components/pages/common/account/EditEmail';
import Login from './components/pages/common/account/Login';
import Send from './components/pages/common/account/Send';
import Register from './components/pages/common/account/Register';
// common/document
import GuideLine from './components/pages/common/document/GuideLine';
import About from './components/pages/common/document/About';
import Privacy from './components/pages/common/document/Privacy';
// owner/account
import OwnerAccountTop from './components/pages/owner/account/AccountTop';
import OwnerEditProfile from './components/pages/owner/account/auth/EditProfile';
// owner/account/auth
import OwnerEmailRegister from './components/pages/owner/account/auth/EmailRegister';
// owner/shop/edit
import OwnerInfectionEdit from './components/pages/owner/shop/edit/OwnerInfectionEdit';
import OwnerShopInfoEdit from './components/pages/owner/shop/edit/OwnerShopInfoEdit';
// owner/shop/register
import OwnerRequestTop from './components/pages/owner/shop/register/OwnerRequestTop';
import OwnerShopForm from './components/pages/owner/shop/register/OwnerShopForm';
// userprofile-icon1.png
import History from './components/pages/user/History';
// user/account
import AccountTop from './components/pages/user/account/AccountTop';
import Comments from './components/pages/user/account/Comments';
// user/account/auth
import EmailRegister from './components/pages/user/account/auth/EmailRegister';
// user/account/manage
import EditLogin from './components/pages/user/account/manage/EditLogin';
import AddEmail from './components/pages/user/account/manage/AddEmail';
// user/shop/register
import UserShopForm from './components/pages/user/shop/register/UserShopForm';
// shop
import Shop from './components/pages/shop/Shop';
import ShopComments from './components/pages/shop/Comments';
import CreateComment from './components/pages/shop/CreateComment';
import CommentPrepare from './components/pages/shop/CommentPrepare';

function App() {
  return (
    <div className="App">
      <CommonProvider>
        <ModalStateProvider>
          <TopModalProvider>
            <BrowserRouter>
              <LoginJudge>
                <RedirectPathProvider>
                  <Switch>
                    <NotOwnerRoute exact path={RouteName.ROOT} component={Top} />
                    <NotOwnerRoute exact path={RouteName.MENU} component={Menu} />
                    <NotOwnerRoute exact path={RouteName.USER_COMMENTS} component={Comments} />
                    <Route exact path={RouteName.SHOP} component={Shop} />
                    <Route exact path={RouteName.SHOP_COMMENTS} component={ShopComments} />
                    <Route exact path={RouteName.PRIVACY} component={Privacy} />
                    <Route exact path={RouteName.LANDING_PAGE} component={About} />
                    <Route exact path={RouteName.GUIDE_LINE} component={GuideLine} />
                    <Route exact path={RouteName.LOGIN} component={Login} />
                    <Route exact path={RouteName.REGISTER} component={Register} />
                    <Route exact path={RouteName.REGISTER_EMAIL} component={EmailRegister} />
                    <Route exact path={RouteName.OWNER_REGISTER_EMAIL} component={OwnerEmailRegister} />
                    <Route exact path={RouteName.SEND} component={Send} />
                    <Route exact path={RouteName.REQUEST_TOP} component={OwnerRequestTop} />
                    <Authentication>
                      <UserRoute exact path={RouteName.COMMENTS_NEW} component={CreateComment} />
                      <UserRoute exact path={RouteName.SHOP_SEARCH_FOR_COMMENTS} component={CommentPrepare} />
                      <UserRoute exact path={RouteName.USER_SHOP_FORM} component={UserShopForm} />
                      <UserRoute exact path={RouteName.ACCOUNT_TOP} component={AccountTop} />
                      <UserRoute exact path={RouteName.SELF_COMMENTS} component={Comments} />
                      <UserRoute exact path={RouteName.EDIT_LOGIN} component={EditLogin} />
                      <UserRoute exact path={RouteName.EDIT_PROFILE} component={EditProfile} />
                      <UserRoute exact path={RouteName.ADD_EMAIL} component={AddEmail} />
                      <UserRoute exact path={RouteName.HISTORY} component={History} />
                      <OwnerRoute exact path={RouteName.OWNER_SHOP_FORM} component={OwnerShopForm} />
                      <OwnerRoute exact path={RouteName.OWNER_EDIT_PROFILE} component={OwnerEditProfile} />                      
                      <OwnerRoute exact path={RouteName.OWNER_ACCOUNT_TOP} component={OwnerAccountTop} />
                      <OwnerRoute exact path={RouteName.OWNER_INFECTION_EDIT} component={OwnerInfectionEdit} />
                      <OwnerRoute exact path={RouteName.OWNER_SHOP_INFO_EDIT} component={OwnerShopInfoEdit} />
                      <Route exact path={RouteName.EDIT_EMAIL} component={EditEmail} />
                      <Route component={NotFound} />
                    </Authentication>
                  </Switch>
                </RedirectPathProvider>
              </LoginJudge>
            </BrowserRouter>
          </TopModalProvider>
        </ModalStateProvider>
      </CommonProvider>
    </div>
  );

}

export default App;