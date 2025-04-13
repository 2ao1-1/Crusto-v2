import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';
import { formatCurrency, formatDate } from '../../utils/helpers';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
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

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-main md:text-3xl">
          Order #{id} Status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="inline-block rounded-full bg-main px-4 py-1 text-sm font-semibold uppercase tracking-wide text-white">
              Priority
            </span>
          )}
          <span className="inline-block rounded-full bg-second px-4 py-1 text-sm font-semibold uppercase tracking-wide text-main">
            {status} order
          </span>
        </div>
      </div>

      <div className="rounded-lg bg-stone-100 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-main">
            {estimatedDelivery && (
              <span>Estimated delivery: {formatDate(estimatedDelivery)}</span>
            )}
          </p>
          <p className="text-xs text-stone-500">
            (Delivery takes 30-45 minutes)
          </p>
        </div>
      </div>

      <ul className="divide-y divide-stone-200 rounded-lg bg-white p-6 shadow-md">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 rounded-lg bg-stone-100 p-6">
        <p className="text-sm font-medium text-main">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-main">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-lg font-bold text-main">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
