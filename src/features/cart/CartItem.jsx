import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-main text-lg font-semibold">
            {quantity}&times;
          </span>
          <p className="text-md font-medium text-stone-800">{name}</p>
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <p className="text-main text-md font-bold">
            {formatCurrency(totalPrice)}
          </p>

          <div className="flex items-center gap-3">
            <UpdateItemQuantity
              pizzaId={pizzaId}
              currentQuantity={currentQuantity}
            />
            <DeleteItem pizzaId={pizzaId} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
