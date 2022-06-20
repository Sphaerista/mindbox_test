/* eslint-disable */
import { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';
import TodoItem from './components/TodoItem';
import Panel from './components/Panel';

function App() {
  const [todoArray,setTodoArray] = useState([])
  const [filteredtodoArray,setFilteredTodoArray] = useState([])
  const [checker,setChecker] = useState(true)
  const [radioValue,setRadioValue] = useState('All')
  const [notFirstRun,setNotFirstRun] = useState(false)

  // keep data after refreshing the page
  useEffect(()=>{
    const loadedTodos = JSON.parse(localStorage.getItem("todos"))
    if(loadedTodos){
      setTodoArray(loadedTodos)
      setFilteredTodoArray(loadedTodos)
    }
  },[])
    useEffect(()=>{
    if(todoArray && notFirstRun===true){
    localStorage.setItem("todos", JSON.stringify(todoArray))}
  },[todoArray])
  
  // handlers
  const addTodoHandler = todo =>{
    // check input's emptiness
    if(!todo.text || /^\s*$/.test(todo.text)){
      return;
    }
    const newTodoArray = [...todoArray,todo]
    setTodoArray(newTodoArray)
    setFilteredTodoArray(newTodoArray)
    setRadioValue('All')
    
  }
  
  const checkHandler = id =>{
    let updatedtodoArrays = todoArray.map(item => {
      if(item.id===id){
        item.completed = !item.completed
      }
      return item
    })
    setNotFirstRun(true)
    setChecker(prev=>!prev)
    setTodoArray(updatedtodoArrays)
    sortHandler()
  }

  // panel handlers
  const clearCompletedHandler=()=>{
    setNotFirstRun(true)
    const remainingTasks = todoArray.filter(item=>item.completed===false)
    setTodoArray(remainingTasks)
    setFilteredTodoArray(remainingTasks)
    setRadioValue('All')
    setChecker(prev=>!prev)
    sortHandler()
  }

  const showHandler=(e)=>{
    setNotFirstRun(true)
    const value = e.target.value
    if(value==='Active'){
      setRadioValue('Active')
      sortHandler()
    }
    else if(value==='Completed'){
      setRadioValue('Completed')
      sortHandler()
    }
    else{
      setRadioValue('All')
      sortHandler()
    }
  }

  const sortHandler=()=>{
    if(radioValue==='Active'){
      const activeList = todoArray.filter(item=>item.completed===false)
      setFilteredTodoArray(activeList)
    }
    else if(radioValue==='Completed'){
      const completedList = todoArray.filter(item=>item.completed===true)
      setFilteredTodoArray(completedList)
    }
    else{
      setFilteredTodoArray(todoArray)
    }
  }

  // updating list
  useEffect(()=>{
    if(notFirstRun)
      sortHandler()
  },[checker,radioValue])

  return (
    <div className="App">
      <h1>todos</h1>
      <Panel 
      todoArray={todoArray}
      showHandler = {showHandler}
      clearCompletedHandler = {clearCompletedHandler}
      radioValue = {radioValue}/>
      <Input addTodo={addTodoHandler}/>
      <div className='todoList'><TodoItem todoArray={filteredtodoArray} checkHandler={checkHandler}/></div>
      
    </div>
  );
}

export default App;
