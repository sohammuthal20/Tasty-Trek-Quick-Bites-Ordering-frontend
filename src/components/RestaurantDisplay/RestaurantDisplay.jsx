import React, { useContext } from "react";
import "./RestaurantDisplay.css";
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import { StoreContext } from "../../Context/StoreContext";

const RestaurantDisplay = ({ category }) => {
  const { restaurant_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top restaurants near you</h2>
      <div className="food-display-list">
        {restaurant_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <RestaurantItem
                key={item.id}
                image={item.image_link}
                name={item.restaurant_name}
                desc={item.area}
                id={item.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default RestaurantDisplay;
