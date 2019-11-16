import React, {useState, useContext} from 'react';
import '../styles/TaskCard.css';
import Auth from '@aws-amplify/auth';
import Link from 'next/link';

export const SettingsContext = React.createContext(null);

const colors = ['#ff4242', '#53a3ff', '#4aff36', '#00041c', '#ff8f2e', '#b44eff', '#ffd752'];

const createColor = (color: string, index: number) => {
  const {changeColor, color: c} = useContext(SettingsContext);
  return (<div key={index} className={c === color ? 'color selected' : 'color'} style={{backgroundColor: color}} onClick={() => changeColor({color})} />);
};

const signOut = setUser => () => {
  Auth.signOut()
    .then(() => setUser(null))
    .catch(e => console.error(`error siging out: ${e}`));
}

const SettingsCard = () => {
  const {addCard, color} = useContext(SettingsContext);
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
          <button className='setting' onClick={() => addCard({color})}>Add Card</button>
          {user ? (<button className='setting' onClick={signOut(setUser)}>Sign Out</button>) : (<Link href='/signin'><button className='setting'>Sign In</button></Link>)}
        </div>
        <div className='colors'>
          {colors.map(createColor)}
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
