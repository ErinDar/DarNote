import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useLocation, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import Darnote from "../assets/submark.svg"
import '../CSS/SignUpForm.css'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const user = useSelector(state => state.session.user);

  const body = document.querySelector("body")
  const classes = body.classList

  if (location.pathname === "/sign-up") {
    document.body.classList.remove(...classes)
    document.body.classList.add("signup-body")
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
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
    <div className='signup-page'>
      <div className='signup-form'>
        <div className='signup-form-header'>
          <div className='signup-header-logo'>
            <img src={Darnote} alt="Darnote submark" className="signup-logo"></img>
          </div>
          <p className='signup-form-tagline'>Remember everything important.</p>
        </div>
        <div className='signup-form-items'>
          <div className='form-signup'>
            <form onSubmit={onSignUp}>
              <div className='user-form-fields'>
                {!!errors.length &&
                  (<div className='error-messages'>
                    {errors.filter(err => err.toLowerCase().includes("user"))}
                  </div>)}
                <div className='signup-form-email'>
                  <input
                    name='email'
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={updateFirstName}
                  />
                </div>
                <div className='signup-form-email'>
                  <input
                    name='email'
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={updateLastName}
                  />
                </div>
                <div className='signup-form-email'>
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
                <div className='signup-form-password'>
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
              <div className={(!firstName.length && !lastName.length && !email.length && !password.length) ? 'signup-submit-buttons-disabled' : 'signup-submit-buttons'}>
                <button type='submit'>Sign Up</button>
              </div>
            </form>
          </div>
          <div className="login-account">
            <div className='login-account-header'>Already have an account?</div>
            <div className='toggle-signup'>
              <NavLink to="/signup" className="login-account-link">Log In</NavLink>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default SignUpForm;


{/* <div className='signup-page'>
  <div className='signup-form'>
    <div className='signup-form-header'>
      <div className='signup-header-logo'>
        <img src={Darnote} alt="Darnote submark" className='signup-logo' />
      </div>
      <p className='signup-form-tagline'>Remember everything important.</p>
    </div>
    <div className='signup-form-items'></div>
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  </div>
</div> */}
