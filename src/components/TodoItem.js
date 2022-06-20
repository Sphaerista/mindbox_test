import React from 'react'
import "./TodoItem.css"



const TodoItem = ({todoArray, checkHandler}) => {

  return todoArray.map(item=>(
    <div className='todoItem' key={item.id}>
    <input type='checkbox' className='rounded-checkbox' id='checkbox' checked={item.completed} onChange={()=>checkHandler(item.id)} />
    <label htmlFor='checkbox'></label>
    <div className={item.completed ? "todoItem-completed" : "todoItem-incomplete"}>{item.text}</div>
    </div>
  ))
}

export default TodoItem