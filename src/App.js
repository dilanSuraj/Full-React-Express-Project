import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import TodoList from "./components/todos-list.component";
import TodoEdit from "./components/edit-todo.component";
import TodoCreate from "./components/create-todo.component";
import BgImg from './img/bgImg.jpg';

import logo from "./logo.svg";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container" 
                  style={{  
                    backgroundImage: `url({BgImg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
                            <img src={logo} width="30" height="30" alt="Cosing the smartway image here"/>
                        </a>
                        <Link to="/" className="navbar-brand">Home ToDo App</Link>
                        <div className="collapse navbar-collapse">
                           <ul className="navbar-nav mr-auto">
                               <li className="navbar-item">
                                   <Link to="/" className="nav-link">ToDos</Link>
                               </li>
                               <li className="navbar-item">
                                   <Link to="/create" className="nav-link">Create ToDos</Link>
                               </li>
                           </ul>
                        </div>
                    </nav>
                    <Route path="/" exact component={TodoList}/>
                    <Route path="/edit/:id" component={TodoEdit}/>
                    <Route path="/create" component={TodoCreate}/>
                </div>

            </Router>
        );
    }
}

export default App;
