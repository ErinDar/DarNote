import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashPage from './components/SplashPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/Dashboard'
import Notebook from './components/Notebooks'
import Note from './components/Notes'
import Editor from './components/Editor';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* do not want to be able to go back to the splash page after log in */}
        <Route path='/' exact={true} >
          {user == null ? <SplashPage /> : <Redirect to="/dashboard" />}
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/test' exact={true}>
          <Editor />
        </Route>
        <ProtectedRoute path='/dashboard' exact={true} >
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/notebooks' exact={true} >
          <Notebook />
        </ProtectedRoute>
        <ProtectedRoute path='/notes' exact={true}>
          <Note />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
