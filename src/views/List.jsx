import { useState } from 'react';
import Item from '../components/Items/Item';
import { useItems } from '../context/ListProvider';

export default function List() {
  const [newItem, setNewItem] = useState('');
  const { items, handleAddItem, handleDeleteItem, handleUpdateItem } =
    useItems();

  // Add new item to list
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItem(newItem);
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
