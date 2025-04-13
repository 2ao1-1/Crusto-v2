import { useDispatch, useSelector } from 'react-redux';

// Components
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

// Store & Utils
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      {/* Pizza Image */}
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />

      {/* Pizza Details */}
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>

        {/* Price and Actions */}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm">
            {!soldOut ? (
              formatCurrency(unitPrice)
            ) : (
              <span className="font-medium uppercase text-stone-500">
                Sold out
              </span>
            )}
          </p>

          <div className="flex items-center gap-3 md:gap-8">
            {isInCart && (
              <>
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={id} />
              </>
            )}

            {!soldOut && !isInCart && (
              <Button type="small" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
