import logo from './logo.svg';
import './App.css';
import React, {Suspense, lazy, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch,useHistory,Link } from 'react-router-dom';
// const Home = lazy(() => import('./routes/Home'));
const Register = lazy(() => import('./view/register/Register'));
const Login = lazy(() => import('./view/login/Login'));
const Home = lazy(() => import('./view/home/Home'));
const App = () => {

  const history = useHistory();
  console.log(history)
  useEffect(() => {

    history.push('./login')
  }, [])
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/*<Route exact path="/" component={Home}/>*/}
            <Route
              path="/register"
              component={Register}
            />
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/home"
              component={Home}
            />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
