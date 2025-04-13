// Import UI Components
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';

// Import Cart Related Components
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

// Import Redux Related
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';

/**
 * Cart Component
 * Displays the shopping cart contents and handles cart operations
 */
function Cart() {
  // Redux hooks
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);

  // If cart is empty, show empty cart component
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-3">
      {/* Navigation back to menu */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Cart header with username */}
      <h2 className="text-main mt-7 text-2xl font-semibold md:text-3xl">
        Your cart, {username}
      </h2>

      {/* Cart items list */}
      <ul className="mt-6 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      {/* Cart actions */}
      <div className="mt-8 space-y-4 sm:flex sm:items-center sm:justify-end sm:space-x-4 sm:space-y-0">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
