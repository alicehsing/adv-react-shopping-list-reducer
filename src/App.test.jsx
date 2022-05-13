import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
});

it('component test - renders a header consisted of a heading element and a button', () => {
  screen.getByRole('heading', {
    name: 'My Shopping List',
  });

  screen.getByLabelText('clear cart');
});

it('should be able to add a new item to the shopping list', () => {
  //find input and type in an item
  const input = screen.getByPlaceholderText('➕ Add an item');
  userEvent.type(input, 'Meat 🍗');

  //find "Add Item" button
  const addItemButton = screen.getByRole('button', { name: /Add Item/i });
  //click Add Item button
  userEvent.click(addItemButton);

  //new item gets rendered on the list view
  expect(screen.getByText('Meat 🍗')).toBeInTheDocument();
});

// it('should count added items and reset cart to 0');
