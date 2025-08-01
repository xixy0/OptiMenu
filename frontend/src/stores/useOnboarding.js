import { create } from "zustand";

const useOnboarding = create((set, get) => ({
  step: 1,
  maxCompletedStep: 1,

  restaurantDetails: {
    logo: null,
    name: "",
    address: "",
    phone: "",
    email: "",
  },
  restaurantId: "",
  menuItems: [],
  // menuItems: [{name: "", price: 0, category: "", description: "", logo: null}]
  floorPlan: {
    floors: [],
    // floors: floor[], floor: {name: "", tables: []}, table: {capacity: 0,}
  },
  users: [],
  // users: [{name: "", email: "", role: ""}]

  nextStep: () =>
    set((state) => ({
      step: state.step + 1,
      maxCompletedStep: Math.max(state.maxCompletedStep, state.step + 1),
    })),
  prevStep: () =>
    set((state) => ({
      step: Math.max(1, state.step - 1),
    })),
  reset: () =>
    set({
      step: 1,
      maxCompletedStep: 1,
      restaurantDetails: {
        logo: null,
        name: "",
        address: "",
        phone: "",
        email: "",
      },
      menuItems: [],
      floorPlan: {
        floors: [],
      },
      users: [],
    }),
  setStep: (newStep) => {
    const state = get();
    // Only allow setting step if it's not beyond maxCompletedStep
    if (newStep <= state.maxCompletedStep) {
      set({ step: newStep });
    }
  },
  // New method to mark a step as completed
  completeStep: (completedStep) =>
    set((state) => ({
      maxCompletedStep: Math.max(state.maxCompletedStep, completedStep),
    })),

  setRestaurantDetails: (details) =>
    set((state) => ({
      restaurantDetails: { ...state.restaurantDetails, ...details },
    })),
  setRestaurantId: (id) => set((state) => ({ restaurantId: id })),
  addMenuItems: (items) =>
    set((state) => ({
      // menuItems: [...state.menuItems, ...items],
      menuItems: items,
    })),
  setFloorPlan: (floorPlan) =>
    set({
      floorPlan,
    }),
  addUsers: (users) =>
    set((state) => ({
      // users: [...state.users, ...users],
      users: users,
    })),
}));

export default useOnboarding;
