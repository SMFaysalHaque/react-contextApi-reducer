/* eslint-disable no-case-declarations */
export default function shopReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,

        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantityInStock: product.quantityInStock - 1,
              }
            : product
        ),

        cart: [...state.cart, { ...action.payload }],
      };

    case "REMOVE_FROM_CART":
      const itemToRemove = state.cart.find(
        (item) => item.id === action.payload.id
      );
      const quantityToRestore = itemToRemove?.quantity || 0;

      return {
        ...state,

        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantityInStock: product.quantityInStock + quantityToRestore,
              }
            : product
        ),

        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,

        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantityInStock: product.quantityInStock - 1,
              }
            : product
        ),

        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                quantityInStock: item.quantityInStock - 1,
              }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,

        products: state.products.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantityInStock: product.quantityInStock + 1,
              }
            : product
        ),

        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity - 1,
                quantityInStock: item.quantityInStock + 1,
              }
            : item
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        selectState: action.payload,
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchState: action.payload,
      };

    default:
      throw new Error("Unhandled action type: " + action.type);
  }
}
