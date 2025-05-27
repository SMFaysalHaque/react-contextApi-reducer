import { useShopState } from "../Context/ShopContext";

export default function CartItem({ item }) {
  const {
    id,
    name,
    size,
    color,
    currentPrice,
    quantity,
    imageUrl,
    quantityInStock,
    imageAlt,
  } = item;
  const { dispatch } = useShopState();
  const handleCart = (actionType) => {
    dispatch({
      type: actionType,
      payload: { id },
    });
  };
  return (
    <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{name}</h3>
          <span
            className="text-red-500 text-sm cursor-pointer"
            onClick={() => handleCart("REMOVE_FROM_CART")}
          >
            ×
          </span>
        </div>
        <p className="text-sm text-gray-500">Size: {size}</p>
        <p className="text-sm text-gray-500">Color: {color}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">${currentPrice}</p>
          <div className="flex items-center space-x-2">
            <button
              className={`w-6 h-6 bg-gray-100 rounded flex items-center justify-center  ${
                quantity === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={quantity === 1}
              onClick={() => handleCart("DECREASE_QUANTITY")}
            >
              −
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              className={`w-6 h-6 bg-gray-100 rounded flex items-center justify-center  ${
                quantityInStock === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={quantityInStock === 0}
              onClick={() => handleCart("INCREASE_QUANTITY")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
