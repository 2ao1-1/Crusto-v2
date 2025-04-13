import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
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
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden sm:h-56">
        <img
          src={imageUrl}
          alt={name}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            soldOut ? 'opacity-70 grayscale' : ''
          }`}
        />
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <p className="rotate-45 rounded-full bg-main px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white">
              Sold out
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-main">{name}</h3>
        <p className="mb-4 line-clamp-2 text-sm italic text-stone-500">
          {ingredients.join(', ')}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-semibold text-main">
            {!soldOut ? formatCurrency(unitPrice) : ''}
          </p>

          <div className="flex items-center gap-3">
            {isInCart && (
              <div className="flex items-center gap-2">
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={id} />
              </div>
            )}

            {!soldOut && !isInCart && (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
