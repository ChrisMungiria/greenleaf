import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const useSetLimit = async (limit, name) => {
  const uid = auth.currentUser.uid;
  const docRef = doc(db, "users", uid);

  // Set the "capital" field of the city 'DC'
  await updateDoc(docRef, {
    [name.toLowerCase() + "Limit"]: limit,
  });

  alert(`Successfully set ${name} limit to ${limit}`);
};

export default useSetLimit;
