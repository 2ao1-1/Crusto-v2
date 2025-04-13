import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';
import Button from '../../ui/Button';

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <Button type="small" onClick={handleDeleteItem}>
      delete
    </Button>
  );
}
