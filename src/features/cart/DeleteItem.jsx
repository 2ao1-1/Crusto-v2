// Import UI components
import Button from '../../ui/Button';

// Import Redux related
import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';

/**
 * DeleteItem Component
 * Button component to remove an item from the cart
 * @param {string} props.pizzaId - The ID of the pizza to delete
 */
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
