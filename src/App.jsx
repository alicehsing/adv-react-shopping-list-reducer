import Header from './components/Layout/Header';
import { ListProvider } from './context/ListProvider';
import ShoppingList from './views/List';

export default function App() {
  return (
    <>
      <ListProvider>
        <Header />
        <ShoppingList />
      </ListProvider>
    </>
  );
}
