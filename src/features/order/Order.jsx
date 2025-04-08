// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

// const order = {
//   customer: "Jonas Schmedtmann",
//   status: "delivered",
//   priority: true,
//   cart: [
//     {
//       addIngredients: [],
//       removeIngredients: [],
//       pizzaId: 1,
//       name: "Margherita",
//       quantity: 2,
//       unitPrice: 12,
//       totalPrice: 24,
//     },
//     {
//       addIngredients: [],
//       removeIngredients: [],
//       pizzaId: 4,
//       name: "Prosciutto e Rucola",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       addIngredients: [],
//       removeIngredients: [],
//       pizzaId: 6,
//       name: "Vegetale",
//       quantity: 1,
//       unitPrice: 13,
//       totalPrice: 13,
//     },
//     {
//       addIngredients: [],
//       removeIngredients: [],
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       addIngredients: [],
//       removeIngredients: [],
//       pizzaId: 11,
//       name: "Spinach and Mushroom",
//       quantity: 2,
//       unitPrice: 15,
//       totalPrice: 30,
//     },
//   ],
//   id: "IIDSAT",
//   estimatedDelivery: "2027-04-25T06:42:22",
//   // estimatedDelivery: "2027-04-25T10:00:00",

//   orderPrice: 147,
//   priorityPrice: 29,
// };

export default function Order() {
  const order = useLoaderData();
  console.log(order);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    customer,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
