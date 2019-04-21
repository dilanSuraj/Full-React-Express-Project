import React, {Component} from 'react';
import axios from 'axios';

export default class TodoEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false

        };

        this.onChangeTodDoCompleted = this.onChangeTodDoCompleted.bind(this);
        this.onChangeTodDoDescription = this.onChangeTodDoDescription.bind(this);
        this.onChangeTodDoPriority = this.onChangeTodDoPriority.bind(this);
        this.onChangeTodDoResponsible = this.onChangeTodDoResponsible.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:4001/todos/'+this.props.match.params.id).then(res =>{
            this.setState({
                todo_description: res.data.todo_description,
                todo_priority: res.data.todo_priority,
                todo_completed: res.data.todo_completed,
                todo_responsible: res.data.todo_responsible
            })
        }).catch(function (err) {
            console.log(err);
        })
    }

    onChangeTodDoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodDoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodDoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodDoCompleted(e) {
        this.setState({
            todo_completed: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        //Communicate with backend

        let newTodo = {
            todo_description: this.state.todo_description,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed,
            todo_responsible: this.state.todo_responsible
        };

        axios.post('http://localhost:4001/todos/update/'+this.props.match.params.id,newTodo)
            .then(res => {

                console.log(res.data);
            });

        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                <div style={{marginTop: 20}}>
                    <h3>Update Todo</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Description : </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.todo_description}
                                   onChange={this.onChangeTodDoDescription}/>
                        </div>

                        <div className="form-group">
                            <label>Responsible : </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.todo_responsible}
                                   onChange={this.onChangeTodDoResponsible}/>
                        </div>

                        <div className="form-group">
                            <label>Completed : </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.todo_completed}
                                   onChange={this.onChangeTodDoCompleted}/>
                        </div>

                        <div className="form-group">

                            <div className="form-check form-check-inline">
                                <input type="radio"
                                       name="priorityOptions"
                                       className="form-check-input"
                                       id="priorityLow"
                                       value="Low"
                                       checked={this.state.todo_priority === 'Low'}
                                       onChange={this.onChangeTodDoPriority}/>
                                <label className="form-check-label">Low : </label></div>

                            <div className="form-check form-check-inline">
                                <input type="radio"
                                       name="priorityOptions"
                                       className="form-check-input"
                                       id="priorityMedium"
                                       value="Medium"
                                       checked={this.state.todo_priority === 'Medium'}
                                       onChange={this.onChangeTodDoPriority}/>
                                <label className="form-check-label">Medium : </label></div>

                            <div className="form-check form-check-inline">
                                <input type="radio"
                                       name="priorityOptions"
                                       className="form-check-input"
                                       id="priorityHigh"
                                       value="High"
                                       checked={this.state.todo_priority === 'High'}
                                       onChange={this.onChangeTodDoPriority}/>
                                <label className="form-check-label">High : </label></div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Update ToDo" className="btn btn-primary"/>
                        </div>


                    </form>
                </div>
            </div>

        );
    }
}