import { RootState } from '@/store/redux/store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
