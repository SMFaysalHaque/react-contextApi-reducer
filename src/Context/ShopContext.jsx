import { createContext, useContext, useReducer } from "react";
import { products } from "../data/data";
import shopReducer from "./shopReducer";
const ShopContext = createContext(null);

const initialState = {
  products: products,
  cart: [],
  selectState: "",
  searchState: "",
};

export default function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const store = {
    state,
    dispatch,
  };
  return <ShopContext.Provider value={store}>{children}</ShopContext.Provider>;
}

export const useShopState = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ContextProvider");
  }
  return context;
};
