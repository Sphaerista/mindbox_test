import React, { useState } from 'react'
import "./Input.css"

const Input = (props) => {
    const [input,setInput]=useState("")

    const addTodo = () => {
        props.addTodo({
            id: Date.now(),
            text: input,
            completed: false
        })
        setInput('')
    }
  return (
    <div className='input'>
        <input type="text" value={input} placeholder='Add todo...' onChange={e=>setInput(e.target.value)}/>
        <button onClick={addTodo}>Add todo</button>
    </div>
  )
}

export default Input