import { useContext } from "react";
import { UserCartContext } from "../../context/userCart/UserCartProvider";


// Show on logged in user
export const ShowOnLoggedIn = ({ children }) => {
  const {user} = useContext(UserCartContext)
  if (user) {
    return children;
  } else {
    return null;
  }
};

// Show on logout user
export const ShowOnLogout = ({ children }) => {
  const {user} = useContext(UserCartContext)
  if (!user) {
    return children;
  } else {
    return null;
  }
};
