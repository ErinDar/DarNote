import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import Darnote from "../assets/submark.svg"
import "../CSS/LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const body = document.querySelector("body")
  const classes = body.classList

  if (location.pathname === "/login") {
    document.body.classList.remove(...classes)
    document.body.classList.add("login-body")
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
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <label htmlFor='email'>Email</label>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <label htmlFor='password'>Password</label>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
                <button type='submit'>Continue</button>
              </div>
            </form>
          </div>
          <div className="create-account">
            <div className='create-account-header'>Don't have an account?</div>
            <div className='toggle-signup'>
              <NavLink to="/sign-up" className="create-account-link">Create account</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
