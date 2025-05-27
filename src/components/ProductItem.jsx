import { useShopState } from "../Context/ShopContext";

export default function SingleProduct({ product }) {
  const {
    id,
    name,
    imageUrl,
    imageAlt,
    ratingValue,
    ratingLabel,
    quantityInStock,
    currentPrice,
    previousPrice,
    discountPercentage,
  } = product;

  const {
    dispatch,
    state: { cart },
  } = useShopState();

  const existOnCart = cart.some((item) => item.id === id);
  const disabled = quantityInStock === 0;
  let btnText;
  let btnStyle =
    "w-full mt-2 py-1 rounded flex items-center justify-center active:translate-y-1 transition-all cursor-pointer";

  if (disabled) {
    btnStyle =
      " cursor-not-allowed w-full mt-2 py-1 rounded bg-red-800 text-gray-100";
    btnText = "Remove from Cart";
  } else if (existOnCart) {
    btnStyle += " bg-red-800 text-gray-100 hover:bg-red-700";
    btnText = "Remove from Cart";
  } else {
    btnStyle += " bg-gray-800 text-gray-100 hover:bg-gray-700";
    btnText = "Add to Cart";
  }

  const handleCart = () => {
    existOnCart
      ? dispatch({
          type: "REMOVE_FROM_CART",
          payload: { id },
        })
      : dispatch({
          type: "ADD_TO_CART",
          payload: {
            ...product,
            quantity: 1,
            quantityInStock: quantityInStock - 1,
          },
        });
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-1">
            <div className="flex text-[16px]">
              <RenderStars rating={ratingValue} />
            </div>
            <span className="text-xs text-gray-500 ml-1">{ratingLabel}</span>
          </div>
          <span className="text-xs text-gray-700">
            ({quantityInStock} pcs left)
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <p className="font-bold text-gray-900">${currentPrice}</p>
          {previousPrice && (
            <p className="text-gray-400 line-through ml-1">${previousPrice}</p>
          )}
          {discountPercentage && (
            <span className="ml-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
              {discountPercentage}
            </span>
          )}
        </div>
        <button className={btnStyle} disabled={disabled} onClick={handleCart}>
          {btnText}
        </button>
      </div>
    </div>
  );
}

const RenderStars = ({ rating }) => {
  const stars = [];
  const roundedRating = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= roundedRating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    );
  }
  return stars;
};
