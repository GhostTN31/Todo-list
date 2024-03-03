import React, { useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { EditTodoForm } from './EditTodoForm'
import { v4 as uuidv4 } from 'uuid'
uuidv4()

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos([...todos, {
            id: uuidv4(), task: todo,
            completed: false, isEditing: false
        }])
        console.log(todos)
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, completed: !todo.completed
        } : todo
        ))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing
        } : todo
        ))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo, task, isEditing: !todo.isEditing
        } : todo
        ))
    }

    const todayDate = () => {
        const date = new Date();
        const format = { day: 'numeric', month: 'short', year: 'numeric' }
        return date.toLocaleDateString('en-US', format);
    }

    return (
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>

            <div className="date_div">
                <h4>Date: &nbsp; <span >{todayDate()}</span></h4>
            </div>

            <TodoForm addTodo={addTodo} />

            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask}
                        task={todo} />
                ) : (
                    <Todo task={todo} key={index}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo} editTodo={editTodo} />
                )

            ))}

        </div>
    )
}
