import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="account-container">
      <div className="account-content">
        <div className="account-title">
          <h2>Account Settings</h2>
        </div>
        <div className="form-row">
          <div className="input-content">
            <span>First Name</span>
            <input type="text" placeholder="Name" />
          </div>
          <div className="input-content">
            <span>Last Name</span>
            <input type="text" placeholder="Name" />
          </div>
        </div>
        <div className="form-row">
          <div className="input-content">
            <span>E-mail</span>
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-content">
            <span>Phone Number</span>
            <input type="text" placeholder="Phone" />
          </div>
        </div>
        <div>
          <Button onClickButton={() => navigate('/create-product')}>Create a new product</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};
