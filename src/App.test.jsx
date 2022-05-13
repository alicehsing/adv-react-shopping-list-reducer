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

it('component test - renders a header consisted of a heading element and a button as well as list of pre-set shopping items ', () => {
  screen.getByRole('heading', {
    name: 'My Shopping List',
  });

  screen.getByLabelText('clear cart');

  screen.getByText(/Corn/i);
  screen.getByText('Steak 🥩');
  screen.getByText('Ice Cream 🍦');
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

it('should be able to edit an existing item', async () => {
  const editButton = screen.getByLabelText('Edit Corn 🌽');
  userEvent.click(editButton);
  const editInput = screen.getByLabelText('Edit field');
  userEvent.type(editInput, '4 Corns 🌽');
  const saveButton = screen.getByLabelText('Save changes');
  userEvent.click(saveButton);
  const editItem = await screen.findByText(/4 Corns/i);
  expect(editItem).toBeInTheDocument();
  screen.debug();
});

// it('should be able to mark a shopping item as done with strike through on text')

// it('should be able to delete an item on the list')

// it('should count added items and reset cart to 0');
