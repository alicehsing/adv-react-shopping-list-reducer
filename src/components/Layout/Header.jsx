import React from 'react';
import { useItems } from '../../context/ListProvider';
import styles from '../../App.css';

export default function Header() {
  const { items, handleClearAll } = useItems();

  return (
    <>
      <header>
        <h1>My Shopping List</h1>
        <div className={styles.count_box}>
          <div>
            🛒 <span>{items.length}</span>
          </div>
          <button
            type="submit"
            aria-label="clear cart"
            onClick={handleClearAll}
          >
            Clear Cart
          </button>
        </div>
      </header>
    </>
  );
}
