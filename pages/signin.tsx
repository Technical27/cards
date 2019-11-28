import React, {useState} from 'react';
import Auth from '@aws-amplify/auth';
import Router from 'next/router';
import Link from 'next/link';
import 'normalize.css/normalize.css';
import '../styles/signin.css';

import Amplify from '@aws-amplify/core';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const colors = ['#ff4242', '#53a3ff', '#4aff36', '#00041c', '#ff8f2e', '#b44eff', '#ffd752'];

const login = (username: string, password: string) => e => {
  e.preventDefault();
  if (username && password) {
    Auth.signIn(username, password)
      .then(user => {
        if (!user.challengeName) Router.push({pathname: '/'});
        else console.log(`Challenge name: ${user.challengeName}`);
      })
      .catch(err => console.error(err));
  }
}

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [background, setBackground] = useState();

  if (!background) setBackground(colors[Math.floor(Math.random() * 7)]);

  return (
    <div id='main'>
      <span className='background' style={{backgroundImage: `linear-gradient(-60deg, white, ${background})`}}/>
      <div className='card'>
        <span className='name'>Sign in</span>
        <span className='sep'/>
        <form onSubmit={login(username, password)} className='body'>
          <div className='input'>
            <span>email:</span>
            <input type='text' id='email' onChange={({target}) => setUsername(target.value)} value={username} autoComplete='username' />
          </div>
          <div className='input'>
            <span>password:</span>
            <input type='password' id='password' onChange={({target}) => setPassword(target.value)} value={password} autoComplete='current-password' />
          </div>
          <input type='submit' value='login' disabled={!(username && password && password.length >= 6)} />
          <Link href='/signup'>Don't have an account? sign up</Link>
          <Link href='/'>Back to main page</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
