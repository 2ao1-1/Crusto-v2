// Import UI components
import LinkButton from '../../ui/LinkButton';

/**
 * EmptyCart Component
 * Displays a message when the cart is empty with a link to return to menu
 */
function EmptyCart() {
  return (
    <div className="px-4 py-3">
      {/* Navigation back to menu */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Empty cart message */}
      <p className="text-main mt-7 font-semibold">
        Your cart is empty. Start adding some delicious pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
