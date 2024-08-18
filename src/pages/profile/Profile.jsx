import { Button } from "../../components/button/Button";
import "./Profile.css";

export const Profile = () => {
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
          <Button>Create a new product</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};
