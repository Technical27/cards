import React, {useState, useContext} from 'react';
import '../styles/TaskCard.css';

export const SettingsContext = React.createContext(null);

const createColor = (color, handle) => {
  const {changeColor, color: c} = useContext(SettingsContext);
  return (<div className={c === color ? 'color selected' : 'color'} style={{backgroundColor: color}} onClick={() => changeColor({color})}></div>);
};

const SettingsCard = props => {
  const {addCard} = useContext(SettingsContext);
  return (
    <div className='card'>
      <span className='name'>Settings</span>
      <span className='sep'></span>
      <div className='body settings'>
        <button onClick={addCard}>Add Card</button>
        <div className='colors'>
          {createColor('black')}
          {createColor('#ff0000')}
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
