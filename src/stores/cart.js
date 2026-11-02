import {create} from "zustand";
import { persist } from "zustand/middleware";

// Создаем хранилище с помощью zustand
const useStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const itemExists = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (itemExists) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set({ cart: [] }),
      increaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === itemId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    {
      name: "cart-storage", // имя для хранилища
    }
  )
);

export default useStore;
