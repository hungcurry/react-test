import { createContext, useContext, useReducer , ReactNode } from 'react';

// 1. 定義資料的型別
type TState = {
  count: number
} 
// 2. 定義 action 型別
type TAction = 
  | { type: 'add' }
  | { type: 'subtract' }
  | { type: 'reset' }

// 3. Context 型別：一定要寫 <TProvid | null>
type TProvid = {
  state: TState
  // Version 1：<Provider value={{ state, dispatch }}> → 暴露 dispatch
  // 不過這樣子會讓使用者直接操作 dispatch，較不建議
  // dispatch: React.Dispatch<TAction>

  // Version 2：<Provider value={{ state, increment, remove, ... }}> → 沒有暴露 dispatch
  add: () => void;
  subtract: () => void;
  reset: () => void;
}
// 4.初始狀態 ( 請注意通常初始的狀態會是一個物件)。
// → 能隨時擴充
const initialState: TState = { 
  count: 0 
}
// 5. 建立 Context
const CountContext = createContext<TProvid | null>(null)
export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('Context not found.')
  }
  return context;
}

// 6. reducer：TS 自動推論 state 與 action 型別
function reducer(state: TState, action: TAction): TState {

  console.log(`state` , state);
  console.log(`action` , action);

  switch (action.type) {
    case 'add':
      return { count: state.count + 1 }
    case 'subtract':
      return { count: state.count - 1 }
    case 'reset':
      return initialState
    default:
      return state
  }
}
// 8. 子元件 => Inject  
function Child() {
  const context = useContext(CountContext)
  if (!context) return <div>Context not found.</div>

  const { state, add , subtract } = context
  console.log('state', state)

  return (
    <>
    <div>Count: {state.count}</div>
    <button onClick={() => add()}>
      {state.count}
    </button>
    <button onClick={() => subtract()}>
      Subtract
    </button>
    </>
  )
}
// 7. 父元件=> Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const add = () => dispatch({ type: 'add' });
  const subtract = () => dispatch({ type: 'subtract' });
  const reset = () => dispatch({ type: 'reset' });

  const provideValue = { state, add, subtract, reset };

  return (
    <CountContext.Provider value={ provideValue }>
      {/* 使用 children 類似開 slot 功能 才有辦法引入其他元件 */}
      {/* 並且 export const App */}
      { children }

      {/* import Child from './components/Child' */}
      <Child />
    </CountContext.Provider>
  )
}
