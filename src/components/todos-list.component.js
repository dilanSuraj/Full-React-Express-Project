import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_completed.toString()}</td>
        <td className={props.todo.todo_completed ? 'completed':''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
);

export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4001/todos/').then(res => {
            this.setState({
                todos: res.data
            });
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });
    }

    //After adding this, we do not need to refresh the page to see the updated codes
    componentDidUpdate() {
        axios.get('http://localhost:4001/todos/').then(res => {
            this.setState({
                todos: res.data
            });
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });
    }

    todoList() {
        return this.state.todos.map(function (currenttodo, i) {
            return <Todo todo={currenttodo} key={i}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>ToDo List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsibility</th>
                        <th>Completed</th>
                        <th>Priority</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.todoList()}
                    </tbody>
                </table>
            </div>

        );
    }
}