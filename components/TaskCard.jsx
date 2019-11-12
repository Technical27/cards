import React, {useState, useImperativeHandle} from 'react';
import '../styles/TaskCard.css';

const TaskCard = React.forwardRef((props, ref) => {
  const [body, setBody] = useState(props.body);
  const [name, setName] = useState(props.name);
  const [color, setColor] = useState(props.color);

  useImperativeHandle(ref, () => ({changeColor: (color) => setColor(color)}));

  return (
    <div className='card' card={props.id} style={{borderColor: color}}>
      <textarea className='name' value={name} onChange={e => {if (e.target.value.length <= 40) setName(e.target.value.replace('\n', ''));}}></textarea>
      <span className='sep' style={{backgroundColor: color}}></span>
      <textarea className='body' value={body} onChange={e => setBody(e.target.value)}></textarea>
    </div>
  );
});

TaskCard.defaultProps = {color: '#00041c', body: '', name: ''};

export default TaskCard;
