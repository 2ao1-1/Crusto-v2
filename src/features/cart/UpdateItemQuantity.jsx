// Import UI components
import Button from '../../ui/Button';

// Import Redux related
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

/**
 * UpdateItemQuantity Component
 * Provides buttons to increase or decrease item quantity in cart
 * @param {string} props.pizzaId - The ID of the pizza to update
 * @param {number} props.currentQuantity - Current quantity of the item
 */
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Decrease quantity button */}
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>

      {/* Current quantity display */}
      <span className="text-sm font-medium">{currentQuantity}</span>

      {/* Increase quantity button */}
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
