import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCustomer from "@/stores/useCustomer";

const SessionGuard = ({ children }) => {
  const isLoggedIn = useCustomer((state) => state.isLoggedIn);
  const initializeSession = useCustomer((state) => state.initializeSession);
  const recoverSession = useCustomer((state) => state.recoverSession);

  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const setupSession = async () => {
      try {
        // If the user is logged in, recover session
        if (isLoggedIn) {
          const result = await recoverSession();
          if (!result.success) {
            console.error("Failed to recover session:", result.error);
            navigate(`/baseurl/restId/`); // Redirect to auth page on failure
          }
        } else {
          // Initialize a new session for guest users
          // const sessionInitResult = await initializeSession(null); // Pass tableNumber if available
          const sessionInitResult = initializeSession(null); // Pass tableNumber if available
          console.log("Initialisation result: ", sessionInitResult);
          if (!sessionInitResult.success) {
            console.error(
              "Failed to initialize session:",
              sessionInitResult.error
            );
            navigate(`/baseurl/restId/`); // Redirect to auth page on failure
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error during session setup:", error);
        navigate(`/baseurl/restId/`); // Redirect to auth page on failure
      }
    };

    setupSession();
  }, [isLoggedIn, initializeSession, recoverSession, navigate]);

  if (!isInitialized) {
    return <div>Loading...</div>; // Show a loading indicator until initialization is complete
  }

  return <>{children}</>;
};

export default SessionGuard;
