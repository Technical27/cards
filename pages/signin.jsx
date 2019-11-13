import React, {useState} from 'react';
import Auth from '@aws-amplify/auth';
import Router from 'next/router';
import '../styles/signin.css';

const login = (username, password) => e => {
  e.preventDefault();
  if (username && password) {
    Auth.signIn(username, password)
      .then(user => {
        console.log(user);
        if (!user.challengeName) Router.push({pathname: '/'});
        else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          Auth.completeNewPassword(user, 'dankmemes', {email: 'aamaruvi@gmail.com'});
        }
      })
      .catch(err => console.error(err));
  }
}


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id='main'>
      <div className='card'>
        <span className='name'>Sign in</span>
        <span className='sep'/>
        <form onSubmit={login(email, password)} className='body'>
          <div className='input'>
            <span>email:</span>
            <input type='text' id='email' onChange={({target}) => setEmail(target.value)} value={email} autoComplete='email' />
          </div>
          <div className='input'>
            <span>password:</span>
            <input type='password' id='password' onChange={({target}) => setPassword(target.value)} value={password} autoComplete='current-password' />
          </div>
          <input type='submit' value='login' disabled={!(email && password && password.length >= 6)} />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
