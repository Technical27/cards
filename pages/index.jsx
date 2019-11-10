import React, {useReducer, useEffect, useRef} from 'react';
import TaskCard from '../components/TaskCard';
import SettingsCard, {SettingsContext} from '../components/SettingsCard';
import '../styles/index.css';

const addCardReducer = (cards, action) => {
  const ref = React.createRef();
  return [...cards, (<TaskCard key={cards.length} id={cards.length} ref={ref}/>)];
};

const handleClick = ((cards, color, changeColor) => ({target}) => {
  const id = target.getAttribute('card') || target.parentNode.getAttribute('card');
  if (id) cards[id].ref.current.changeColor(color);
  changeColor({color: null});
});

const colorReducer = (cur, {color}) => {
  return cur === color ? null : color;
}

const Index = () => {
  const [cards, addCard] = useReducer(addCardReducer, [(<SettingsCard key='0' />)]);
  const [color, changeColor] = useReducer(colorReducer, null);
  useEffect(() => {
    if (color) {
      const handle = handleClick(cards, color, changeColor);
      window.addEventListener('click', handle);
      return () => window.removeEventListener('click', handle);
    }
  });
  return (
    <div id='main'>
      <SettingsContext.Provider value={{addCard, changeColor, color}}>
        <div id='cards'>{cards}</div>
      </SettingsContext.Provider>
    </div>
  );
};

export default Index;
