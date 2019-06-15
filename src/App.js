import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Map from './Components/Map.jsx'
import PostForm from './Components/PostForm.jsx'


function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Map}></Route>
        <Route exact path='/create-post' component={PostForm}></Route>
      </Switch>
    </>
  );
}

export default App;
