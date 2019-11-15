import React, {useReducer, useEffect} from 'react';
import TaskCard from '../components/TaskCard';
import SettingsCard, {SettingsContext} from '../components/SettingsCard';
import 'normalize.css/normalize.css';
import '../styles/index.css';

const addCardReducer = (cards: React.Component[], action) => {
  const ref = React.createRef();
  if (action.remove) return cards.slice(0, -1);
  return [...cards, (<TaskCard key={cards.length} id={cards.length} ref={ref} color={action.color}/>)];
};

const handleClick = ((cards, color, changeColor) => ({target}) => {
  const id = target.getAttribute('id') || target.parentNode.getAttribute('id');
  if (id) {
    const matches = id.match(/card-([0-9]+)/);
    if (matches) cards[matches[1]].ref.current.changeColor(color);
  }
  changeColor({color: null});
});

const colorReducer = (cur, {color}) => {
  return cur === color ? null : color;
}

const removeCard = (addCard) => () => {
  addCard({remove: true});
};

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
      <SettingsContext.Provider value={{addCard, changeColor, color, removeCard: removeCard(addCard)}}>
        <div id='cards'>{cards}</div>
      </SettingsContext.Provider>
    </div>
  );
};

export default Index;
