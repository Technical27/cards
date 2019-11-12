import React, {useState, useContext, useEffect} from 'react';
import '../styles/TaskCard.css';
import Auth from '@aws-amplify/auth';
import Link from 'next/link';

export const SettingsContext = React.createContext(null);

const createColor = color => {
  const {changeColor, color: c} = useContext(SettingsContext);
  return (<div className={c === color ? 'color selected' : 'color'} style={{backgroundColor: color}} onClick={() => changeColor({color})} />);
};

const signOut = setUser => () => {
  Auth.signOut()
    .then(() => setUser(null))
    .catch(e => console.error(`error siging out: ${e}`));
}

const SettingsCard = props => {
  const {addCard} = useContext(SettingsContext);
  const [user, setUser] = useState();

  if (typeof user === 'undefined') {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(e => {
        if (e !== 'not authenticated') console.log(`error getting current user: ${e}`);
        setUser(null);
      });
  };

  return (
    <div className='card'>
      <span className='name'>Settings</span>
      <span className='sep' />
      <div className='body settings'>
        <div className='buttons'>
          <button onClick={addCard}>Add Card</button>
          {user ? (<button onClick={signOut(setUser)}>Sign Out</button>) : (<Link href='/signin'><button>Sign In</button></Link>)}
        </div>
        <div className='colors'>
          {createColor('#ff4242')}
          {createColor('#53a3ff')}
          {createColor('#ffd752')}
          {createColor('#4aff36')}
          {createColor('#ff8f2e')}
          {createColor('#b44eff')}
          {createColor('#00041c')}
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
