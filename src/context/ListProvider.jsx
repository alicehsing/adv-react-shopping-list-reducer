import { createContext, useContext, useReducer } from 'react';

// set initial state
const initialItems = [
  { id: 0, text: 'Corn 🌽', done: false },
  { id: 1, text: 'Steak 🥩', done: false },
  { id: 2, text: 'Ice Cream 🍦', done: false },
];

const clearAllItems = [];

// reducer function
const reducer = (state, action) => {
  console.log('state', state);
  console.log('action', action);
  switch (action.type) {
    case 'ADD_ITEM': {
      // return our updated state with the newly added shopping item at the beginning of our list
      const newState = [
        { id: state.length, text: action.payload.text, done: false },
        ...state,
      ];
      console.log('newState', newState);
      return newState;
    }
    case 'DELETE_ITEM':
      return state.filter((item) => item.id !== action.payload.id);
    case 'UPDATE_ITEM':
      // Find the provided item
      // Update its content
      // Return a new array with the updated item
      return state.map((item) => {
        if (item.id === action.payload.item.id) {
          const { done, text } = action.payload.item;

          return {
            ...item,
            done,
            text,
          };
        }
        return item;
      });
    case 'CLEAR_FORM':
      return clearAllItems;
    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

const ItemContext = createContext();

export const ListProvider = ({ children }) => {
  // bring in useReducer hook, pass in reducer function and set initialItems state
  const [items, dispatch] = useReducer(reducer, initialItems);

  // Add new item to list
  const handleAddItem = (text) => {
    // dispatch becomes the "action" in reducer.
    dispatch({ type: 'ADD_ITEM', payload: { text } });
  };

  // Delete an item from list
  const handleDeleteItem = (id) => {
    console.log(`Delete item ${id}`);
    dispatch({ type: 'DELETE_ITEM', payload: { id } });
  };

  // Update an item in list
  const handleUpdateItem = (item) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { item } });
  };

  // Clear all items from list
  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_FORM' });
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleUpdateItem,
        handleClearAll,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  // context = { items, handleAddItem, handleDeleteItem, handleUpdateItem, handleClearAll }
  if (context === undefined)
    throw new Error('useItems must be called from within a ListProvider');

  return context;
};
