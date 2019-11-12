import React, {useState} from 'react';
import Auth from '@aws-amplify/auth';

const login = (email, password) => e => {
  e.preventDefault();
  Auth.signIn(email, password)
    .then(user => {
      console.log(user);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      }
    })
    .catch(err => console.error(err));
}


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id='main'>
      <form onSubmit={login(email, password)}>
        <input type='text' id='email' onChange={({target}) => setEmail(target.value)} value={email} autoComplete='email' />
        <input type='password' id='password' onChange={({target}) => setPassword(target.value)} value={password} autoComplete='current-password' />
        <input type='submit' value='login'/>
      </form>
    </div>
  );
};

export default SignIn;
