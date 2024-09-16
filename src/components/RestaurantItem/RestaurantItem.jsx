import React, { useContext, useState } from "react";
import "./RestaurantItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { Link } from "react-router-dom";

const RestaurantItem = ({ image, name, desc, id }) => {
  // const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <Link to={"/restaurant/" + id}>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-image" src={image} alt="" />
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
          </div>
          <p className="food-item-desc">{desc}</p>
          {/* <p className="food-item-price">₹{price}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
