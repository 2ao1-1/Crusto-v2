import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="mb-8 text-2xl font-semibold text-main md:text-3xl">
        Ready to order? Let's go!
      </h2>

      <Form method="POST" className="space-y-8">
        <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="font-medium text-main sm:basis-40">
              First Name
            </label>
            <input
              className="input grow"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="font-medium text-main sm:basis-40">
              Phone number
            </label>
            <div className="grow">
              <input
                className="input w-full"
                type="tel"
                name="phone"
                required
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded bg-red-100 p-2 text-xs text-main">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="font-medium text-main sm:basis-40">Address</label>
            <div className="relative grow">
              <input
                className="input w-full"
                type="text"
                name="address"
                disabled={isLoadingAddress}
                defaultValue={address}
                required
              />
              {addressStatus === 'error' && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
              {!position.latitude && !position.longitude && (
                <span className="absolute right-[3px] top-[3px] z-50">
                  <Button
                    type="small"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                    disabled={isLoadingAddress}
                  >
                    Get Position
                  </Button>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center gap-5">
            <input
              className="h-6 w-6 accent-main focus:outline-none focus:ring focus:ring-main/30 focus:ring-offset-2"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="font-medium text-main">
              Want to give your order priority?
            </label>
          </div>

          <div className="space-y-2 text-main">
            <p className="text-sm font-medium">
              Price for pizza: {formatCurrency(totalCartPrice)}
            </p>
            {withPriority && (
              <p className="text-sm font-medium">
                Price for priority: {formatCurrency(priorityPrice)}
              </p>
            )}
            <p className="text-lg font-bold">
              Total: {formatCurrency(totalPrice)}
            </p>
          </div>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ''
          }
        />

        <div className="flex justify-end">
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

function isValidPhone(str) {
  const phone = /^\+?\d{10,14}$/;
  return phone.test(str);
}

export default CreateOrder;
