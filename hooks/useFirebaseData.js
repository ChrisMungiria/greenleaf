import { useState, useEffect } from "react";
import { ref, onValue, getDatabase } from "firebase/database";

const useFirebaseData = (firebaseApp) => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const db = getDatabase(firebaseApp);

    const userId = "EgodA7YKpuUDhRg9MGKOEsMMVrJ2";
    const sensorDataRef = ref(db, `SensorData/${userId}/readings`);

    const handleData = (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
    };

    const errorLogger = (error) => {
      console.error("Error reading Firebase data:", error);
    };

    const onDataChange = onValue(sensorDataRef, handleData, errorLogger);

    // Cleanup the event listener when the component unmounts
    return () => {
      onDataChange(); // This will unsubscribe the event listener
    };
  }, [firebaseApp]); // Pass the Firebase app instance as a dependency

  return sensorData;
};

export default useFirebaseData;
