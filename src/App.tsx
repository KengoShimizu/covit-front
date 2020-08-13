import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Top } from './components/pages/Top';
import { Test } from './components/pages/Test';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Top}/>
          <Route exact path='/test' component={Test}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
