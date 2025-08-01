import { create } from "zustand";

// Item {
//     id: number;
//     name: string;
//     image?: string;
//     price: number;
//     quantity: number;
// }

const useCart = create((set) => ({
  // items: cartItemsDummy, // array of items
  items: [], // array of items
  total: 0, // total price of all items
  note: "",

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      // Update quantity if item exists
      const updatedItems = existingItem
        ? state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.items, item]; // Add new item if it doesn't exist

      const newTotal = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return { items: updatedItems, total: newTotal };
    }),
  removeItem: (id) =>
    set((state) => {
      state.items = state.items?.filter((item) => item.id !== id);
      const newTotal = state.items?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { items: state.items, total: newTotal };
    }),
  clearCart: () => set({ items: [], total: 0 }),
  incrementQuantity: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }; // Create a new object
        }
        return item;
      });
      const newTotal = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { items: updatedItems, total: newTotal };
    }),
  decrementQuantity: (id) =>
    set((state) => {
      const updatedItems = state.items
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }; // Create a new object
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity 0

      const newTotal = updatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { items: updatedItems, total: newTotal };
    }),
  setNote: (note) => set({ note }),
  placeOrder: () => {},
}));

export default useCart;
