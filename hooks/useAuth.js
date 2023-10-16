import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  // User is stored in a state updated by a function that retrieves the user from the auth
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function that retrieves the user from the auth
    const unsbuscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      // setter for user state
      if (userAuth) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsbuscribe;
  }, []);

  return user;
};

export default useAuth;
