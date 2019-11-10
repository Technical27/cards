import React, {useState, useContext} from 'react';
import '../styles/TaskCard.css';

export const SettingsContext = React.createContext(null);

const createColor = color => {
  const {changeColor, color: c} = useContext(SettingsContext);
  return (<div className={c === color ? 'color selected' : 'color'} style={{backgroundColor: color}} onClick={() => changeColor({color})} />);
};

const SettingsCard = props => {
  const {addCard} = useContext(SettingsContext);
  return (
    <div className='card'>
      <span className='name'>Settings</span>
      <span className='sep' />
      <div className='body settings'>
        <button onClick={addCard}>Add Card</button>
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
