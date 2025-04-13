// React Router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout and Common Components
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Home from './ui/Home';

// Feature Components
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

// Router Configuration
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      // Home Route
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },

      // Menu Route
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },

      // Cart Route
      {
        path: '/cart',
        element: <Cart />,
        errorElement: <Error />,
      },

      // Order Routes
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);

// App Component
function App() {
  return <RouterProvider router={router} />;
}

export default App;

// NETLIFY_AUTH_TOKEN: يمكنك الحصول عليه من إعدادات حسابك على Netlify
// NETLIFY_SITE_ID: معرف موقعك على Netlify
// VITE_API_URL: رابط الـ API الخاص بالتطبيق
