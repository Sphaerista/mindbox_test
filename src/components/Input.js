import React, { useState } from 'react'

const Input = (props) => {
    const [input,setInput]=useState("")

    const addTodo = () => {
        props.addTodo({
            id: Date.now(),
            text: input,
            completed: false
        })
    }
  return (
    <div className='input'>
        <input type="text" value={input} placeholder='Add todo...' onChange={e=>setInput(e.target.value)}/>
        <button onClick={addTodo}>Add todo</button>
    </div>
  )
}

export default Input