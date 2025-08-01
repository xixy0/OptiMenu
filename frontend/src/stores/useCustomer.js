// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // SessionState {
// //   sessionId: string | null,
// //   tableNumber: string | null,
// //   userId: string | null,
// //   deviceId: string | null,
// //   status: 'active' | 'completed' | 'abandoned',
// //   lastActive: number,
// // }

// const generateDeviceId = () => {
//   const components = [
//     navigator.userAgent,
//     window.screen.width,
//     window.screen.height,
//     new Date().getTimezoneOffset(),
//     navigator.language,
//   ];
//   return btoa(components.join("|"));
// };

// const generateUserId = () => {
//   return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
// };

// const useSession = create(
//   persist(
//     (set, get) => ({
//       // Session state
//       sessionId: null,
//       tableNumber: null,
//       userId: null,
//       deviceId: null,
//       status: "active",
//       lastActive: Date.now(),

//       // Initialize new session
//       initializeSession: async (tableNumber) => {
//         try {
//           const deviceId = generateDeviceId();
//           const userId = get().userId || generateUserId();

//           const response = await fetch("/api/sessions/initialize", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               tableNumber,
//               deviceId,
//               userId,
//             }),
//           });

//           if (!response.ok) {
//             throw new Error("Failed to initialize session");
//           }

//           const data = await response.json();

//           set({
//             sessionId: data.sessionId,
//             tableNumber,
//             userId,
//             deviceId,
//             status: "active",
//             lastActive: Date.now(),
//           });

//           return { success: true, userId };
//         } catch (error) {
//           console.error("Session initialization failed:", error);
//           return { success: false, error: error.message };
//         }
//       },

//       // Recover existing session
//       recoverSession: async () => {
//         const state = get();
//         if (!state.sessionId || !state.userId) {
//           return { success: false, error: "No session to recover" };
//         }

//         try {
//           const response = await fetch("/api/sessions/recover", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               sessionId: state.sessionId,
//               userId: state.userId,
//               deviceId: generateDeviceId(),
//             }),
//           });

//           if (!response.ok) {
//             throw new Error("Failed to recover session");
//           }

//           const data = await response.json();
//           set({
//             ...data,
//             lastActive: Date.now(),
//           });

//           return { success: true };
//         } catch (error) {
//           console.error("Session recovery failed:", error);
//           // Clear invalid session
//           get().clearSession();
//           return { success: false, error: error.message };
//         }
//       },

//       // Verify current session
//       verifySession: async () => {
//         const state = get();
//         if (!state.sessionId) {
//           return { isValid: false, error: "No active session" };
//         }

//         try {
//           const response = await fetch(
//             `/api/sessions/${state.sessionId}/verify`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 deviceId: state.deviceId,
//                 userId: state.userId,
//               }),
//             }
//           );

//           if (!response.ok) {
//             throw new Error("Session verification failed");
//           }

//           const data = await response.json();
//           set({ lastActive: Date.now() });

//           return { isValid: true, ...data };
//         } catch (error) {
//           console.error("Session verification failed:", error);
//           return { isValid: false, error: error.message };
//         }
//       },

//       // Update session status
//       updateStatus: (status) => set({ status }),

//       // Clear session
//       clearSession: () =>
//         set({
//           sessionId: null,
//           tableNumber: null,
//           userId: null,
//           deviceId: null,
//           status: "active",
//           lastActive: null,
//         }),

//       // Check if session is active
//       isSessionActive: () => {
//         const state = get();
//         const sessionTimeout = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
//         const isTimedOut =
//           state.lastActive && Date.now() - state.lastActive > sessionTimeout;

//         return state.sessionId && state.status === "active" && !isTimedOut;
//       },

//       // Handle page refresh/reload
//       handleReload: async () => {
//         const state = get();
//         if (state.sessionId && state.status === "active") {
//           return get().recoverSession();
//         }
//         return { success: false, error: "No active session to recover" };
//       },
//     }),
//     {
//       name: "restaurant-session-storage",
//       partialize: (state) => ({
//         sessionId: state.sessionId,
//         tableNumber: state.tableNumber,
//         userId: state.userId,
//         deviceId: state.deviceId,
//         status: state.status,
//         lastActive: state.lastActive,
//       }),
//     }
//   )
// );

// export default useSession;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const generateDeviceId = () => {
  const components = [
    navigator.userAgent,
    window.screen.width,
    window.screen.height,
    new Date().getTimezoneOffset(),
    navigator.language,
  ];
  return btoa(components.join("|"));
};

const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

const useCustomer = create(
  persist(
    (set, get) => ({
      // Auth state
      username: null,
      isLoggedIn: false,
      userId: null,
      deviceId: generateDeviceId(),

      // Session state
      sessionId: null,
      tableNumber: null,
      status: "active",
      lastActive: Date.now(),

      // Login functionality
      login: async (username) => {
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          });

          if (!response.ok) {
            throw new Error("Login failed");
          }

          const data = await response.json();

          // Store user details and userId from login response
          set({
            username,
            isLoggedIn: true,
            userId: data.userId,
          });

          // Store userId in local storage
          // localStorage.setItem("userId", data.userId);

          // httpOnly cookies instead of local storage
          // document.cookie = `userId=${data.userId}; Path=/; HttpOnly; SameSite=Strict;`;

          return { success: true };
        } catch (error) {
          console.error("Login failed:", error);
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        // Clear user state and remove userId from local storage
        set({ username: null, isLoggedIn: false, userId: null });
        // localStorage.removeItem("userId");

        // httpOnly cookies instead of local storage
        // document.cookie = "userId=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0;";
      },

      // For testing purposes
      initializeSession: (tableNumber) => {
        const userId = get().userId || generateUserId();

        set({
          tableNumber,
          status: "active",
          lastActive: Date.now(),
          userId,
        });

        return { success: true };
      },

      // Initialize new session
      // initializeSession: async (tableNumber) => {
      //   // --- Initializing the session in the backend ---
      //   try {
      //     let userId =
      //       get().userId || localStorage.getItem("userId") || generateUserId();
      //     // Ensure the userId is stored in local storage if not logged in
      //     if (!get().isLoggedIn) {
      //       localStorage.setItem("userId", userId);
      //     }
      //     //  httpOnly cookies instead of local storage
      //     // if (!get().isLoggedIn) {
      //     //   document.cookie = `userId=${userId}; Path=/; HttpOnly; SameSite=Strict;`;
      //     // }
      //     const response = await fetch("/api/sessions/initialize", {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({
      //         tableNumber,
      //         deviceId: get().deviceId,
      //         userId,
      //       }),
      //     });
      //     if (!response.ok) {
      //       throw new Error("Failed to initialize session");
      //     }
      //     const data = await response.json();
      //     set({
      //       // sessionId: data.sessionId,
      //       tableNumber,
      //       status: "active",
      //       lastActive: Date.now(),
      //     });
      //     return { success: true };
      //   } catch (error) {
      //     console.error("Session initialization failed:", error);
      //     return { success: false, error: error.message };
      //   }
      // },

      // Recover existing session
      recoverSession: async () => {
        const state = get();
        if (!state.sessionId || !state.userId) {
          return { success: false, error: "No session to recover" };
        }

        try {
          const response = await fetch("/api/sessions/recover", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: state.sessionId,
              userId: state.userId,
              deviceId: state.deviceId,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to recover session");
          }

          const data = await response.json();
          set({
            ...data,
            lastActive: Date.now(),
          });

          return { success: true };
        } catch (error) {
          console.error("Session recovery failed:", error);
          get().clearSession();
          return { success: false, error: error.message };
        }
      },

      // Clear session
      clearSession: () => {
        set({
          sessionId: null,
          tableNumber: null,
          status: "active",
          lastActive: null,
        });
      },

      // Check if session is active
      isSessionActive: () => {
        const state = get();
        const sessionTimeout = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
        const isTimedOut =
          state.lastActive && Date.now() - state.lastActive > sessionTimeout;

        return state.sessionId && state.status === "active" && !isTimedOut;
      },
    }),
    {
      name: "restaurant-auth-session-storage",
      partialize: (state) => ({
        username: state.username,
        isLoggedIn: state.isLoggedIn,
        userId: state.userId,
        sessionId: state.sessionId,
        tableNumber: state.tableNumber,
        status: state.status,
        lastActive: state.lastActive,
      }),
    }
  )
);

export default useCustomer;
