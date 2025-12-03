type state = {
  id: string | number;
};
// ★ state 應該是陣列！
type TState = state[];
type TAction =
  | { type: "ADD"; payload: state }
  | { type: "REMOVE"; payload: string | number };

export function cartReducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "REMOVE":
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
}
