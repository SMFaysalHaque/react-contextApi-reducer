import { useShopState } from "../Context/ShopContext";

export default function NotFound() {
  const { dispatch } = useShopState();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <svg
        className="w-40 h-40 text-gray-400 mb-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        onClick={() =>
          dispatch({
            type: "SET_SEARCH",
            payload: "",
          })
        }
      >
        Clear Search Texts
      </button>
    </div>
  );
}
