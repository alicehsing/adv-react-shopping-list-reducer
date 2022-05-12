import { createContext, useContext, useReducer } from 'react';

const initialItems = [
  { id: Date.now(), text: 'Corn 🌽', done: false },
  { id: Date.now(), text: 'Steak 🥩', done: false },
  { id: Date.now(), text: 'Ice Cream 🍦', done: false },
];

const 