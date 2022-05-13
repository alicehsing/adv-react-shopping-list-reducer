import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
});

it('component test - renders a header consisted of a heading element, a reset button, item count as well as a list of pre-set shopping items ', () => {
  screen.getByRole('heading', {
    name: 'My Shopping List',
  });

  const count = screen.getByLabelText('count');
  expect(count).toHaveTextContent('3');

  screen.getByLabelText('clear cart');
  screen.getByText(/Corn/i);
  screen.getByText('Steak 🥩');
  screen.getByText('Ice Cream 🍦');
});

it('should be able to add a new item to the shopping list', () => {
  //find input and type in an item
  const input = screen.getByPlaceholderText('➕ Add an item');
  userEvent.type(input, 'Meat 🍗');

  //find "Add Item" button and click
  const addItemButton = screen.getByRole('button', { name: /Add Item/i });
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
  expect(editItem).toHaveTextContent('4 Corns 🌽');
  expect(editItem).toBeInTheDocument();
});

it('should be able to delete an item on the list', () => {
  //on load, render the 3 initial items on the list
  screen.getByText(/Corn/i);
  screen.getByText('Steak 🥩');
  screen.getByText('Ice Cream 🍦');

  //find delete button and click
  const deleteButton = screen.getByLabelText('Delete Steak 🥩');
  userEvent.click(deleteButton);

  //render 2 items on the list
  screen.getByText('Corn 🌽');
  screen.getByText('Ice Cream 🍦');
});

it('header component should keep track of the total count of the shopping list', () => {
  //on load count = 3
  let count = screen.getByLabelText('count');
  expect(count).toHaveTextContent('3');

  //deletes an existing item from the list
  const deleteSteak = screen.getByLabelText('Delete Steak 🥩');
  userEvent.click(deleteSteak);

  //count updated to 2
  expect(count).toHaveTextContent('2');
});

it('header component has a button that resets the shopping list', () => {
  //on load count = 3
  let count = screen.getByLabelText('count');
  expect(count).toHaveTextContent('3');

  //find reset button
  const resetButton = screen.getByRole('button', { name: /Clear Cart/i });
  userEvent.click(resetButton);

  //update count = 0
  expect(count).toHaveTextContent('0');
});

it('should be able to mark a shopping item as done with strike through on text', () => {
  //on load, render the 3 initial items on the list
  const corn = screen.getByText('Corn 🌽');
  screen.getByText('Steak 🥩');
  screen.getByText('Ice Cream 🍦');

  //find checkbox in front of corn
  const checkCorn = screen.getByTestId(0);
  //check checkbox
  userEvent.click(checkCorn);
  expect(corn).toHaveStyle({ textDecoration: 'line-through' });
});
