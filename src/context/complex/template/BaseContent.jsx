import React, { createContext, useContext, useReducer } from 'react';

const CountContext = createContext();
const countReducer = (state, action) => {
  console.log(`state` , state);
  console.log(`action` , action);
  switch(action.type) {
    case 'increment':
      return {
        count: state.count + 1
      };
    case 'decrement':
      return {
        count: state.count - 1
      };
    default:
      return state
  }
}

// 父元件=> Provider DataContext
function App() {
  // 原本寫法
  // const [count, setCount] = useState(0)

  // useReducer寫法
  // const [現在資料, 更新函式] = useReducer(更新邏輯, 初始資料)
  const initState = { count: 0 }
  const [state, dispatch] = useReducer(countReducer, initState)

  // 只暴露明確的「動作函式」
  const add = () => dispatch({ type: 'increment' })
  const subtract = () => dispatch({ type: 'decrement' })

  const provideValue = { state, add , subtract};

  return (
    <CountContext.Provider value={ provideValue }>
      <Child />
    </CountContext.Provider>
  )
}

// 子元件 => Inject  取 useContext 
function Child() {
  const { state, add } = useContext(CountContext)
  return (
    <button onClick={() => add()}>
      {state.count}
    </button>
  )
}

export default App;
