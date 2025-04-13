import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';

// Services & Utils
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

// Components
import OrderItem from './OrderItem';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  // Load menu data for ingredients
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-9 px-4 py-6">
      {/* Order Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="flex flex-wrap gap-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* Order Items */}
      <ul className="divide-y divide-stone-200 border-y">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher?.data?.find((p) => p.id === item.pizzaId)?.ingredients ??
              []
            }
            isLoadingIngredients={fetcher.state === 'loading'}
          />
        ))}
      </ul>

      {/* Price Details */}
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold text-stone-600">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {/* Priority Update Button */}
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
