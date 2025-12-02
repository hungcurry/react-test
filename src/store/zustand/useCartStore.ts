import { create } from 'zustand'
// pnpm install immer
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// ----------- Types -----------
type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type TCartItem = {
  product: TProduct;
  quantity: number;
};

type TCartStore = {
  items: TCartItem[];
  addToCart: (product: TProduct) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

// ----------- v5寫法 + devtools + immer -----------
export const useCartStore = create<TCartStore>()(
  devtools(
    immer((set, get) => ({
      items: [],

      // items: [
      //   {
      //     product: {
      //       id: number;
      //       title: string;
      //       description: string;
      //       price: number;
      //       image: string;
      //       category: string;
      //     };
      //     quantity: number;
      //   },
      // ]

      addToCart: (product) => {
        const { items } = get();
        console.log('store', get());
        console.log('items', items);

        const existing = items.find(item => item.product.id === product.id);

        if (existing) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: (item.quantity ?? 0)+ 1 }
                : item
            )
          });
        } 
        else {
          set({
            items: [
              ...items, 
              { product, quantity: 1 }
            ]
          });
        }
      },

      removeFromCart: (productId) => {
        const { items } = get();
        set({ items: items.filter(i => i.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        const { items } = get();

        if (quantity <= 0) {
          set({ items: items.filter(i => i.product.id !== productId) });
          return;
        }

        set({
          items: items.map(i =>
            i.product.id === productId
              ? { ...i, quantity }
              : i
          )
        });
      },

      clearCart: () => set({ items: [] }),

      // computed values
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      

    })),
    { name: 'cart-store' }
  )
);
