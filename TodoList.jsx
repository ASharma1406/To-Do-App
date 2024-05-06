import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // for unique key

import "./todo.css";

export default function TodoList() {
    // let [todos, setTodos] = useState(["sample task"]);

    //when we add a unique key, we don't use array instead we use object
    let [todos, setTodos] = useState([{task: "sample task", id: uuidv4(), isDone: false}]);

    let [newTodo, setNewTodo] = useState("");

    let [selectedTodo, setSelectedTodo] = useState(null); // keep check on which task is selected

    let [modifiedText, setModifiedText] = useState(""); // store modified task text


    let addNewTask = () => {
        // setTodos([...todos, {task: newTodo, id: uuidv4}]);  this is for adding new item in the list but the exact method is by using a function

        setTodos((prevTodo) => {
            return[...prevTodo, {task: newTodo, id: uuidv4(), isDone: false}]
        });
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id) );
       
    }

    //for Modifying 
    // handle modify is triggred when modify button is clicked

    let handleModify = (id, text) => {
        setSelectedTodo(id);
        setModifiedText(text);
    };

    //handleUpdate is triggered when update button is clicked 
    let handleUpdate = () => {
        if (selectedTodo !== null) {
            setTodos((prevTodos) =>
            prevTodos.map((todo) => 
            todo.id === selectedTodo ? { ...todo, task: modifiedText } : todo
            )   
            );

            setSelectedTodo(null);
            setModifiedText('');
        }
    };

    //for updating arrays
    let upperCaseAll = () => {
        setTodos( (prevTodos) => (
            prevTodos.map((todo) => {
            return {
                ...todo,
                task: todo.task.toUpperCase(),
            };
        })
        ));
    }; // this method will convert all the items in list to uppercase


    // let UpperCaseOne = (id) => {
    //     setTodos( (prevTodos) => 
    //         prevTodos.map((todo) => {
    //             if(todo.id == id) {
    //                 return {
    //                     ...todo,
    //                     task: todo.task.toUpperCase(),
    //                 };
    //             } else {
    //                 return todo;
    //             }
    //         })
    //     );
    //     console.log("one");
    // };

    // for mark task as done
    let markAsDone = (id) => {
        setTodos( (prevTodos) => 
            prevTodos.map((todo) => {
                if(todo.id == id) {
                    return {
                        ...todo,
                        isDone: true,
                    };
                } else {
                    return todo;
                }
            
        })
        );
    }; 

    // mark all as done 
    let allDone = () => {
        setTodos ((prevTodos) => (
            prevTodos.map((todo) => ({
                ...todo,
                isDone: true,
            
        }))
        ));
    };
    
    return (
        <div>
             <h1>To-Do List</h1>

            <input 
                placeholder="Add a task" 
                value={newTodo} 
                onChange={updateTodoValue}
                className="placeholder col-12 bg-light">
                </input>

            {/* If anything gets changed in input value, then update to do function will be called*/}
            &nbsp;  &nbsp;
            <br />
            
            <button 
                onClick={addNewTask}>Add Task</button>
                <br /><br />
                <h2>Tasks to Do:</h2>
                <div className="object-fit-fill border rounded btn-margin" style={{marginLeft: '2rem'}}>
                    <ul className="list-group">
                        {
                        todos.map((todo) => (
                            <li key={todo.id} className="list-group-item">
                                {todo.id === selectedTodo ? (
                                <input type="text" value={modifiedText} onChange={(e) => setModifiedText(e.target.value)} /> ):(
                            
                                <span style={todo.isDone ? {textDecorationLine: "line-through"} : {}}>
                                    {""}
                                    {todo.task} 
                                </span>
                                )}

                                &nbsp; &nbsp; &nbsp;  {/* to give space between button and task */}
                            
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                &nbsp; &nbsp; 
                                {/* <button onClick={() => UpperCaseOne(todo.id)}>UpperCase One</button> */} 
                                <button className="btn btn-primary" onClick={() => markAsDone(todo.id)}>Task is Done</button>
                                &nbsp; &nbsp;
                            
                                <button className="btn btn-secondary" onClick={() => handleModify(todo.id, todo.task)}>Modify</button>
                                &nbsp; &nbsp; &nbsp;
                            
                            </li>  
                        //todo.task is written to use the object
                    ))
                    }
                </ul>
            </div>
            

            <br />

            <button className="btn btn-success" onClick={upperCaseAll}>UpperCase All</button>
            &nbsp;  &nbsp; 
    

            <button className="btn btn-success" onClick={allDone}>All tasks are Done </button>  
            &nbsp;  &nbsp;

            <button className="btn btn-success" onClick={handleUpdate}>Update</button>
            {/* this is for updating all at one time  */}
            {/* if we want to render every item of the array then we will use Map method to render them*/}
            
        </div>
    )
}