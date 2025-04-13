import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="bg-main sticky bottom-0 left-0 right-0 z-50 border-t border-stone-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm uppercase sm:px-6 md:text-base">
        <p className="text-second space-x-4 font-semibold sm:space-x-6">
          <span>{totalCartQuantity} pizzas</span>
          <span>{formatCurrency(totalCartPrice)}</span>
        </p>
        <Link
          to="/cart"
          className="text-second transition-colors duration-300 hover:text-white"
        >
          Open cart &rarr;
        </Link>
      </div>
    </div>
  );
}

export default CartOverview;
