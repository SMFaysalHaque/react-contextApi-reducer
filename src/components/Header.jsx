import { useShopState } from "../Context/ShopContext";
import SearchIcon from "./svg/SearchIcon";
import ShoppingBag from "./svg/ShoppingBag";
import UserIcon from "./svg/UserIcon";

export default function Header() {
  const {
    dispatch,
    state: { searchState },
  } = useShopState();
  const handleFilter = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch({
      type: "SET_SEARCH",
      payload: value,
    });
  };
  return (
    <header className="border-b border-gray-200 py-4 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold">
          LWS.SHOP
        </a>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-500 transition-colors">
            Shop
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            On Sale
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            New Arrivals
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            Brands
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block w-64">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 text-sm pr-10"
              value={searchState}
              onChange={(event) => {
                handleFilter(event);
              }}
            />
            <SearchIcon />
          </div>
          <a href="#" className="hover:text-gray-500 transition-colors">
            <ShoppingBag />
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            <UserIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
