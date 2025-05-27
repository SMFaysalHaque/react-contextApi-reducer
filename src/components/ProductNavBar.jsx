import { useShoppingDispatch, useShoppingState } from "../context/ShopContext";
import { selectItems } from "../data/data";

export default function ProductNavBar() {
  const dispatch = useShoppingDispatch();
  const {
    state: { filter },
  } = useShoppingState();
  const handleSortChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      payload: e.target.value,
    });
  };
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Your Products</h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm">Sort by:</span>
        <select
          className="rounded-md px-2 py-1 text-sm bg-gray-200"
          onChange={handleSortChange}
          value={filter}
        >
          <option value="" disabled>
            Select an option
          </option>
          {selectItems.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
