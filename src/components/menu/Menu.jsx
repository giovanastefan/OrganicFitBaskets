import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import "./Menu.css";

export const Menu = () => {
  const navigate = useNavigate();
  
  const handleClick = (location) => {
    navigate(location);
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
            <span>$57.00</span>
          </div>
          <Button onClick={() => handleClick('/login')}>Login or Sign Up</Button>
        </div>
      </div>
      <div className="menu-secondary">
        <ul>
          <li>
            <p onClick={() => handleClick('/')}>Home</p>
          </li>
          <li>
            <p>Shop</p>
          </li>
          <li>
            <p>About Us</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
