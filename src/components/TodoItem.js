import React from 'react'
import "./TodoItem.css"



const TodoItem = ({todoArray, checkHandler}) => {
    // console.log(todoArray)

  return todoArray.map(item=>(
    <div className='todoItem' key={item.id}>
    <input type='checkbox' checked={item.completed} onChange={()=>checkHandler(item.id)} />
    <p className={item.completed ? "todoItem-completed" : undefined}>{item.text}</p>
    </div>
  ))
}

export default TodoItem