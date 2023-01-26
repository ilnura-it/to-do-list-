import React from 'react';
import { useState } from 'react';

import './App.css';

function App() {

  type FormElement = React.FormEvent<HTMLFormElement>

  interface ITodo {
    text: string
    complete: boolean
  }

  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([])
  
  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTodo(value)
    setValue('') 
  }
 
  const addTodo = (text: string) => {
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index: number):void => {
    const newTodos: ITodo[] = [...todos]
    if (newTodos[index].complete){
      newTodos.splice(index, 1)
    setTodos(newTodos)
    }
    
  }
 

  return (
  <>
  <div className="App">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} required />
        <button type="submit">Add To Do</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <ul key={index} className="toDo-list">
          <li style={{ textDecoration: todo.complete ? "line-through" : ''}} key={index}>{todo.text}</li>
          {' '}
          <div>
            <button type='button' onClick={() => completeTodo(index)}>{todo.complete ? "Incomplete" : "Complete"}{' '}</button>
          <button type="button" onClick={() => removeTodo(index)}>&times;</button>
          </div>
          
          </ul>
          )
          
           
        })}
      </section>
    </div>
  
  </>
    
  );
}

export default App;
