import { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';
import TodoItem from './components/TodoItem';
function App() {
  const [todoArray,setTodoArray] = useState([])

  // keep data after refreshing the page
  useEffect(()=>{
    const loadedTodos = JSON.parse(localStorage.getItem("todos"))
    if(loadedTodos){
      setTodoArray(loadedTodos)
    }
  },[])
  
  useEffect(()=>{
    if(todoArray.length>0){
    localStorage.setItem("todos", JSON.stringify(todoArray))}
  },[todoArray])

  const addTodoHandler = todo =>{
    // check input's emptiness
    if(!todo.text || /^\s*$/.test(todo.text)){
      return;
    }

    const newTodoArray = [...todoArray,todo]
    setTodoArray(newTodoArray)
  }
  const checkHandler = id =>{
    let updatedtodoArrays = todoArray.map(item => {
      if(item.id===id){
        item.completed = !item.completed
      }
      return item
    })
    setTodoArray(updatedtodoArrays)
  }
  console.log(todoArray)

  return (
    <div className="App">
      <h1>todos</h1>
      <Input addTodo={addTodoHandler}/>
      <div className='todoList'><TodoItem todoArray={todoArray} checkHandler={checkHandler}/></div>
    </div>
  );
}

export default App;
