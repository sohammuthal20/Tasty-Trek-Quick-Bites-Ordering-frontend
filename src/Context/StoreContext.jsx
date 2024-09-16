import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const url2 = "http://localhost:8000";
  const [restaurant_list, setRestaurantList] = useState([]);
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [restaurant, setRestaurant] = useState(-1);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // if (token) {
    //   await axios.post(
    //     url + "/api/cart/add",
    //     { itemId },
    //     { headers: { token } }
    //   );
    // }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // if (token) {
    //   await axios.post(
    //     url + "/api/cart/remove",
    //     { itemId },
    //     { headers: { token } }
    //   );
    // }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        for (let i = 0; i < food_list.length; i++) {
          if (item == food_list[i].id) {
            totalAmount += food_list[i].item_price * cartItems[item];
          }
        }
        // totalAmount += itemInfo.item_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url2 + "/swiggy/items/all");
    console.log(response.data.items);
    setFoodList(response.data.items);
  };

  const fetchRestaurantList = async () => {
    const response = await axios.get(url2 + "/swiggy/restaurants/all");
    // console.log(response.data.restaurants);
    setRestaurantList(response.data.restaurants);
  };

  const loadCartData = async (token) => {
    // const response = await axios.post(
    //   url + "/api/cart/get",
    //   {},
    //   { headers: token }
    // );
    // setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchRestaurantList();
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    fetchRestaurantList,
    restaurant_list,
    token,
    setToken,
    loadCartData,
    setCartItems,
    restaurant,
    setRestaurant,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
