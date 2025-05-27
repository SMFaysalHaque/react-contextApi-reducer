import { useShopState } from "../Context/ShopContext";
import CartItem from "./CartItem";
import Promo from "./svg/Promo";

export default function Cart() {
  const {
    state: { cart },
  } = useShopState();
  const subTotal = cart.reduce((acc, item) => {
    return acc + item.currentPrice * item.quantity;
  }, 0);

  const discount = subTotal * 0.2;
  const total = subTotal - discount + 15;
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>
        {cart.length === 0 && (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        )}
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (-20%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">${cart.length && 15}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${subTotal ? total.toFixed(2) : subTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Add promo code"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              />
              <Promo />
            </div>
            <button className="bg-black text-white rounded-md px-4 py-2 text-sm">
              Apply
            </button>
          </div>
          <a
            href="#"
            className="block bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Go to Checkout
            <span className="inline-block ml-2">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
