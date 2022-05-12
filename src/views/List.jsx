import { useReducer, useState } from 'react';

// set initial state
const initialItems = [
  { id: 0, text: 'Corn 🌽', done: false },
  { id: 1, text: 'Steak 🥩', done: false },
  { id: 2, text: 'Ice Cream 🍦', done: false },
];

// reducer function
const reducer = (state, action) => {
  console.log('state', state);
  console.log('action', action);
  switch (action.type) {
    case 'ADD_TODO': {
      const newState = [
        { id: state.length, text: action.payload.text, done: false },
        ...state,
      ];
      console.log('newState', newState);
      return newState;
    }
    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

export default function List() {
  // bring in useReducer hook, pass in reducer function and set initialItems state
  const [items, dispatch] = useReducer(reducer, initialItems);
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch becomes the "action" in reducer.
    dispatch({ type: 'ADD_TODO', payload: { text: newItem } });
    setNewItem('');
  };

  return (
    <>
      <h1>List of To-Buy Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="newItem"
          placeholder="Add an item"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <button>Add Item</button>
      </form>
      <section>
        <p>Display list below</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <p>{item.text}</p>
              <button type="button">Edit</button>
              <button type="button">Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
