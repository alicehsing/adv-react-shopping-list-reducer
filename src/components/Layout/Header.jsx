import React from 'react';
import { useItems } from '../../context/ListProvider';

export default function Header() {
  const { items } = useItems();

  return (
    <>
      <h1>My Shopping List</h1>
      <h2>Total items: {items.length}</h2>
      <button>Clear Cart</button>
    </>
  );
}
