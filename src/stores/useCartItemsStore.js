import { set, without } from "ramda";
import { create } from "zustand";

const useCartItemsStore = create(() => ({
  cartItems: [],
  toggleIsInCart: slug => {
    set(({ cartItems }) => {
      if (cartItems.includes(slug)) {
        return { cartItems: without([slug], cartItems) };
      }

      return { cartItems: [slug, ...cartItems] };
    });
  },
}));

export default useCartItemsStore;
