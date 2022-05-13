import { useState } from 'react';
import Item from '../components/Items/Item';
import { useItems } from '../context/ListProvider';
import styles from '../App.css';

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
      <div className={styles.shopping_list}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="newItem"
            className={styles.addInput}
            placeholder="➕ Add an item"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
          <button className={styles.addButton}>Add Item</button>
        </form>
        <section>
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
      </div>
    </>
  );
}
