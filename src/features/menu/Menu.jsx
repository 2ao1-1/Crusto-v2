import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <div className="relative pb-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-main md:text-4xl lg:mb-12">
          Our Delicious Pizza Menu
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((pizza) => (
            <MenuItem pizza={pizza} key={pizza.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
