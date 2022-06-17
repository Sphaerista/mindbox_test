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
    setChecker(prev=>!prev)
    setTodoArray(updatedtodoArrays)
    sortHandler()
  }
  // panel handlers
  const clearCompletedHandler=()=>{
    const remainingTasks = todoArray.filter(item=>item.completed===false)
    setTodoArray(remainingTasks)
    setFilteredTodoArray(remainingTasks)
    setRadioValue('All')
    sortHandler()
  }

  const showHandler=(e)=>{
    setNotFirstRun(true)
    console.log(e.target.value)
    const value = e.target.value
    if(value==='Active'){
      setRadioValue('Active')
      sortHandler()
      // const activeList = todoArray.filter(item=>item.completed===false)
      // setFilteredTodoArray(activeList)
    }
    else if(value==='Completed'){
      setRadioValue('Completed')
      sortHandler()
      // const completedList = todoArray.filter(item=>item.completed===true)
      // setFilteredTodoArray(completedList)
    }
    else{
      setRadioValue('All')
      sortHandler()
      // setFilteredTodoArray(todoArray)
    }
    
  }

  const sortHandler=()=>{
    console.log(radioValue)
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
  console.log(checker,radioValue)

  useEffect(()=>{
    if(notFirstRun)
      sortHandler()
  },[checker,radioValue])
  // console.log(filteredtodoArray)
  // console.log(todoArray,filteredtodoArray)

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
