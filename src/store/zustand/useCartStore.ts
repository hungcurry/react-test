import { create } from 'zustand';

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

// ----------- Zustand -----------
export const useCartStore = create<TCartStore>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const { items } = get();
    const existing = items.find(i => i.product.id === product.id);

    if (existing) {
      set({
        items: items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      });
    } else {
      set({
        items: [...items, { product, quantity: 1 }]
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

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  
}));
