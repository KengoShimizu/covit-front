import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Top } from './components/pages/Top';
import { History } from './components/pages/History';

import { Comment } from './components/pages/shop/Comment';
import { Reputations } from './components/pages/shop/Reputations';

import { EmailRegister } from './components/pages/account/auth/EmailRegister';
import { Logout } from './components/pages/account/auth/Logout';
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
        <Switch>
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
          <Route exact path='/accounts/logout' component={Logout}/>
          <Route exact path='/accounts/register' component={Register}/>
          <Route exact path='/accounts/emailregister' component={EmailRegister}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
