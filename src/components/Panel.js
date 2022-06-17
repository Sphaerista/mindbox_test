import React from 'react'
import "./Panel.css"

const Panel = ({todoArray, showHandler, clearCompletedHandler, radioValue}) => {
    const tasksLeft = todoArray.filter(item=>item.completed===false)
    // console.log(tasksLeft)

  return (
    <div>
        <p>{tasksLeft.length} {tasksLeft.length==1 ? 'task' : 'tasks'} left</p>
        <div className='radios'>
        <div className='radio'>
        <input type="radio" id="displayChoice1"
        name="display" value="All" checked={radioValue === 'All'} onClick={showHandler}/>
        <label htmlFor="displayChoice1">All</label>
        </div>
        <div className='radio'>
        <input type="radio" id="displayChoice2"
        name="display" value="Active" onClick={showHandler}/>
        <label htmlFor="displayChoice2">Active</label>
        </div>
        <div className='radio'>
        <input type="radio" id="displayChoice3"
        name="display" value="Completed" onClick={showHandler}/>
        <label htmlFor="displayChoice3">Completed</label>
        </div>
        </div>
        <button onClick={clearCompletedHandler}>Clear Completed</button>
    </div>
  )
}

export default Panel