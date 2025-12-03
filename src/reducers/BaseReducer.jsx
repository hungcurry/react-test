import { useReducer } from "react";

// Step 1: 集中全部邏輯
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );

    case "REMOVE":
      return state.filter((t) => t.id !== action.payload);

    default:
      return state;
  }
}

// Step 2: 初始化（建議使用 object 或 array 都行）
const initialTodos = [];

const UseReducer = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // 模擬假 todo
  const newTodo = { id: Date.now(), text: "new todo", done: false };
  const sampleId = 1;

  // Action creators（可讀性超高）
  const addTodo = () => dispatch({ type: "ADD", payload: newTodo });
  const toggleTodo = () => dispatch({ type: "TOGGLE", payload: sampleId });
  const removeTodo = () => dispatch({ type: "REMOVE", payload: sampleId });

  return (
    <>
      <div>
        <button type="button" className="text-white" onClick={addTodo}>
          ADD
        </button>
        ｜ 
        <button type="button" className="text-white" onClick={toggleTodo}>
          TOGGLE
        </button>
        ｜ 
        <button type="button" className="text-white" onClick={removeTodo}>
          REMOVE
        </button>
      </div>

      <pre className="text-white mt-2">
        {JSON.stringify(todos, null, 2)}
      </pre>
    </>
  );
};

export default UseReducer;
