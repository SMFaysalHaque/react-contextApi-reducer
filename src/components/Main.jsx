import { useShopState } from "../Context/ShopContext";
import Cart from "./Cart";
import NotFound from "./NotFound";
import ProductItem from "./ProductItem";

const selectItems = [
  { select: "Most Popular", value: "POPULAR" },
  { select: "Newest", value: "NEWEST" },
  { select: "Price: Low to High", value: "LOW TO HIGH" },
  { select: "Price: High to Low", value: "HIGH TO LOW" },
];

export default function Main() {
  const {
    state: { products, selectState, searchState },
    dispatch,
  } = useShopState();

  const normalizedSearch = searchState.toLowerCase();

  const filteredProducts =
    searchState === ""
      ? products
      : products.filter((product) =>
          product.name.toLowerCase().includes(normalizedSearch)
        );

  let sortedProducts;
  switch (selectState) {
    case "LOW TO HIGH":
      sortedProducts = [...filteredProducts].sort(
        (a, b) => a.currentPrice - b.currentPrice
      );
      break;
    case "HIGH TO LOW":
      sortedProducts = [...filteredProducts].sort(
        (a, b) => b.currentPrice - a.currentPrice
      );
      break;
    case "POPULAR":
      sortedProducts = [...filteredProducts].sort(
        (a, b) => b.ratingValue - a.ratingValue
      );
      break;
    case "NEWEST":
      sortedProducts = [...filteredProducts].sort(
        (a, b) => new Date(b.addedDate) - new Date(a.addedDate)
      );
      break;
    default:
      sortedProducts = filteredProducts;
  }

  const finalProducts = sortedProducts;
  const handleSortChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      payload: e.target.value,
    });
  };
  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Products</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              <select
                className="rounded-md px-2 py-1 text-sm bg-gray-200"
                onChange={handleSortChange}
                value={selectState}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {selectItems.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.select}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-grid">
            {products &&
              finalProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
          {finalProducts.length === 0 && <NotFound />}
        </div>
        <Cart />
      </div>
    </main>
  );
}
