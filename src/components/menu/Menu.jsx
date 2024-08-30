import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { useAuth } from "../../context/auth/Auth";

import "./Menu.css";

export const Menu = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = (location) => {
    navigate(location);
  };

  const renderProfile = () => {
    return currentUser ? (
      <>
        <img src="../../../images/Profile.png" alt="Profile" onClick={() => handleClick("/profile")}/>
        <Button onClick={() => handleClick()}>Logout</Button>
      </>      
    ) : (
      <Button onClick={() => handleClick("/login")}>Login or Sign Up</Button>
    );
  };

  return (
    <div>
      <div className="menu-primary">
        <img src="../../../images/Logo.png" alt="OrganicFit" />
        <div className="search-container">
          <input className="search" placeholder="Search" />
          <Button>Search</Button>
        </div>
        <div className="cart-container">
          <img
            src="../../../images/Cart.png"
            alt="Cart"
            onClick={() => handleClick("/cart")}
          />
          <div className="cart-details">
            <span>Shopping Cart</span>
          </div>
          
          {renderProfile()}
        </div>
      </div>
      <div className="menu-secondary">
        <ul>
          <li>
            <p onClick={() => handleClick("/")}>Home</p>
          </li>
          <li>
            <p onClick={() => handleClick("/shop")}>Shop</p>
          </li>
          <li>
            <p onClick={() => handleClick("/about-us")}>About Us</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
