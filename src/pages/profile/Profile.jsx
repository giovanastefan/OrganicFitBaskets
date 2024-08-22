import { Button } from "../../components/button/Button";
import { OrderHistory } from "../../components/orderHistory/OrderHistory"
import { Input } from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useState } from "react";

export const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="account-container">
      <div className="account-content">
        <div className="account-title">
          <h2>Account Settings</h2>
        </div>
        <div className="form-row">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <Input
            label="E-mail"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />

          <Input
            label="Phone"
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container">
          <Button onClickButton={() => navigate("/create-product")}>
            Create a new product
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
      <OrderHistory />
    </div>
  );
};
