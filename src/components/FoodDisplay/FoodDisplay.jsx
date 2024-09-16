import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category, foodListRestaurant, restaurantName }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Pick up your favourite food from {restaurantName}</h2>
      <div className="food-display-list">
        {foodListRestaurant.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item.id}
                image={item.item_description}
                name={item.item_name}
                // desc={item.description}
                price={item.item_price}
                id={item.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
