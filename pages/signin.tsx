import React, {useState} from 'react';
import Auth from '@aws-amplify/auth';
import Router from 'next/router';
import Link from 'next/link';
import '../styles/signin.css';

const login = (username: string, password: string) => e => {
  e.preventDefault();
  if (username && password) {
    Auth.signIn(username, password)
      .then(user => {
        if (!user.challengeName) Router.push({pathname: '/'});
      })
      .catch(err => console.error(err));
  }
}


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id='main'>
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
          <Link href='/'>Back to main page</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
