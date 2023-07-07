import React, {createContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const TodoContext = createContext();

class TodoContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
        this.readTodo();
    }

    //create
    createTodo(event,todo) {
        event.preventDefault();
        axios.post('/api/todo/create', todo)
            .then(response => {
                console.log(response.data);
                console.log(response.data.todo);
                toast.success('ToDo created successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                let data = [...this.state.todos, response.data.todo];
                this.setState({
                    todos: data,
                });
            })

            .catch(error => {
                console.error(error);
            })

            
            
    }

    //read
    readTodo() {
        axios.get('/api/todo/read')
            .then(response => {
                console.log(response.data);
                this.setState({
                    todos: response.data,
                    });
            })
            .catch(error => {
                console.error(error);
            })
    }

    //update
    updateTodo(data) {
        axios.put('/api/todo/update/' + data.id, data)
        .then (response => {
            console.log(data);
            let todos = [...this.state.todos];
            let todo = todos.find(todo => {
                return todo.id === data.id;
            });

            toast.success('ToDo updated successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            todo.name = data.name;

            this.setState({
                todos: todos,
            });
        })
        .catch(error =>
            {
                console.error(error);
            })

    }

    //delete
    deleteTodo(data) {
        axios.delete('/api/todo/delete/'+ data.id)
        .then(response =>
            {
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id;
                });
                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                todos.splice(todos.indexOf(todo), 1);
        
                this.setState({
                    todos: todos,
                });
            })
        .catch(error =>
            {
                console.error(error);
            })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;