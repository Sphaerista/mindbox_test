import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import TodoItem from './components/TodoItem';
function App() {
  const [todoArray,setTodoArray] = useState([])
  const addTodoHandler = todo =>{
    // check input's emptiness
    if(!todo.text || /^\s*$/.test(todo.text)){
      return;
    }

    const newTodoArray = [...todoArray,todo]
    setTodoArray(newTodoArray)
  }
  // console.log(todoArray)
  
  return (
    <div className="App">
      <h1>todos</h1>
      <Input addTodo={addTodoHandler}/>
      {todoArray.map(item=>(
        <TodoItem key={item.id} id={item.id} text={item.text} completed={item.completed}/>
      ))}
    </div>
  );
}

export default App;
