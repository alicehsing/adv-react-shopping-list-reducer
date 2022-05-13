import { useState } from 'react';
import Item from '../components/Items/Item';
import { useItems } from '../context/ListProvider';

// const initialItems = [
//   { id: 0, text: 'Corn 🌽', done: false },
//   { id: 1, text: 'Steak 🥩', done: false },
//   { id: 2, text: 'Ice Cream 🍦', done: false },
// ];

export default function List() {
  // bring in useReducer hook, pass in reducer function and set initialItems state
  // const [items, dispatch] = useReducer(reducer, initialItems);
  const [newItem, setNewItem] = useState('');
  const { items, handleAddItem, handleDeleteItem, handleUpdateItem } =
    useItems();

  // Add new item to list
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItem(newItem);
    setNewItem('');
  };

  // // Delete an item from list
  // const handleDeleteItem = (id) => {
  //   console.log(`Delete item ${id}`);
  //   dispatch({ type: 'DELETE_ITEM', payload: { id } });
  // };

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
        <button onClick={handleAddItem}>Add Item</button>
      </form>
      <section>
        <p>Display list below</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Item
                item={item}
                clickUpdate={handleUpdateItem}
                clickDelete={handleDeleteItem}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
