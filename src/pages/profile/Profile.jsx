import { Button } from "../../components/button/Button";
import { OrderHistory } from "../../components/orderHistory/OrderHistory";
import { Input } from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import "./Profile.css";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useAuth } from "../../context/auth/Auth";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const { firstName, lastName, email, phone } =  userDoc.data();
          setProfile({
            firstName,
            lastName,
            email,
            phone
          });
        } else {
          setMessage('Error fetching user data, try again!')
          return null;
        }
      } catch (error) {
        setMessage('Error fetching user data, try again!')
        return null;
      }
    };

    fetchProfile();
  }, [currentUser]);

  const updateUser = async () => {   

    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,        
      });
      
      setMessage("User updated with sucess!");
      setProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
      });
    } catch (e) {
      setMessage("Something is wrong, try again!");
    }
  };

  return (
    <div className="account-container">
      <div className="account-content">
        <div className="account-title">
          <h2>Account Settings</h2>
        </div>
        {message && <p>{message}</p>}
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
          <Button onClickButton={updateUser}>Save Changes</Button>
        </div>
      </div>
      <OrderHistory />
      <Button onClickButton={handleLogOut}>Logout</Button>
    </div>
  );
};
