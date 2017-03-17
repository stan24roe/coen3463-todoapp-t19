import React, {PropTypes} from 'react';
import '../components/App.css';
import ToDos from '../components/ToDos.js';
import Loading from './loading';
import TodoApi from '../api/TodoApi';
var moment = require('moment-timezone');



class Todo extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
        }
        this.onAddTodo = this.onAddTodo.bind(this);
    }
    onAddTodo(e) {
        e.preventDefault();
        var lastState = this.props.items; //get last state of item
        let toDo = { //create a todo object to be saved
            name: this.refs.todo.value,
            user: this.props.user,
            createDate: moment().tz("Asia/Manila").format('LLL'),
        }
        this.setState({ //update items
            items :[...lastState,Object.assign({},toDo)]
        });
        TodoApi.onAddTodo(toDo).then(res=>{
            
            console.log(res.data.response);
            if(res.data.success){
                this.props.setStateItem([...lastState,Object.assign({},res.data.response)]);
                this.props.setOriginalItems();
                 
                return;
            }
            
        }).catch(err=>{
            
            console.log(err);
        }); 
    }
    
    render(){
    return(
        <div className="App-section">
                <div className = "form">
                {this.props.isLoading? 
                <Loading text="LOADING" speed={400}/>
                :
                <div>
                <br></br>
                <br></br>
                <strong><p>Hello {this.props.name} ! </p></strong>
                {this.props.onCounting? <Loading text="Loading" speed={300}/>:
                <div>
                 <br></br>
                 You have completed {this.props.completedCount}/{this.props.originalitems} of your Todo List
                </div>
                }
                 <br></br>
                <div className="App-section">

                <button onClick={this.props.todoAll} size="small">All</button> 
                <button onClick={this.props.todoOpen} size="small">Open</button> 
                <button onClick={this.props.todoCompleted} size="small">Completed</button> 
                <button onClick={this.props.DelAllComplete}size="small">Clear Completed</button>

                <form onSubmit={this.onAddTodo}>
                 <br></br>
                    <input placeholder="Add a ToDo item" ref="todo"/>
                    <button type="submit" size="small">Add</button>
                </form>
                 <br/>
                </div>
                <div className="App-section">
                {this.props.onUpdate? <Loading text="Loading" speed={300}/>:
                <div>
                <ul>
                {this.props.items.map((item, index)=>

                    <ToDos key={index}
                            item={item}
                            index={index}
                            onComplete={this.props.onComplete}
                            OnDelete={this.props.OnDelete}/>
                )}
                </ul>
                </div>
                }
                </div>
                <br/>
                <br/>
                <button onClick={this.props.onLogOut} value="Logout">Logout</button>
                </div>
                }
                </div>
        </div>
    )
}
}

Todo.PropTypes = {
    onLogOut: PropTypes.func.isRequired,
    onAddTodo: PropTypes.func.isRequired,
    
}
export default Todo;
