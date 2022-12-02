import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import Darnote from "../assets/submark.svg"
import "../CSS/LoginForm.css"

const LoginForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const body = document.querySelector("body")
  const classes = body.classList

  if (location.pathname === "/login") {
    document.body.classList.remove(...classes)
    document.body.classList.add("login-body")
  }

  const demoSignIn = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
      .then(() => {
        history.push('/dashboard')
      })
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='login-page'>
      <div className='login-form'>
        <div className='login-form-header'>
          <div className='login-header-logo'>
            <img src={Darnote} alt="Darnote submark" className="login-logo"></img>
          </div>
          <p className='login-form-tagline'>Remember everything important.</p>
        </div>
        <div className='login-form-items'>
          <div className='form-login'>
            <form onSubmit={onLogin}>
              <div className='user-form-fields'>
                {!!errors.length &&
                  (<div className='error-messages'>
                    {errors.filter(err => err.toLowerCase().includes("user"))}
                  </div>)}
                <div className='login-form-email'>
                  <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                {!!errors.length &&
                  (<div className='error-messages'>
                    {errors.filter(err => err.toLowerCase().includes("email")).map((err, idx) => (
                      <div key={idx}>{err}</div>
                    ))}
                  </div>)}
                <div className='login-form-password'>
                  <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                {!!errors.length &&
                  (<div className='error-messages'>
                    {errors.filter(err => err.toLowerCase().includes("password"))}
                  </div>)}
              </div>
              <div className={(!email.length && !password.length) ? 'login-submit-buttons-disabled' : 'login-submit-buttons'}>
                <button type='submit'>Log In</button>
              </div>
              <div className='demo-user-button'>
                <button onClick={demoSignIn}>Demo User</button>
              </div>
            </form>
          </div>
          <div className="create-account">
            <div className='create-account-header'>Don't have an account?</div>
            <div className='toggle-signup'>
              <NavLink to="/sign-up" className="create-account-link">Create an account</NavLink>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default LoginForm;
