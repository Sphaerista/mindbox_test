import React from 'react'

const TodoItem = ({id,text,completed}) => {
    console.log(id,text,completed)
  return (
    <p>{text}</p>
  )
}

export default TodoItem