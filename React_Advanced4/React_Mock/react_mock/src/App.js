import { Component } from 'react';
import Todos from './components/Todos';
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      newTask: '',
      tasks: [],
      edit: false,
      currentTaskId: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleNewInput = this.handleNewInput.bind(this);
  }

  async componentDidMount(){
      const res = await fetch('http://localhost:3000/todo');
      const tasks = await res.json();
      this.setState({ tasks: tasks });
  }

  async handleSubmit(newTask){
    await fetch(`http://localhost:3000/todo`, {
        'Content-Type': 'application/json',
        'method': 'POST',
        'body': JSON.stringify({ 'name': newTask })
      });
      this.setState({ newTask: '' });
      this.componentDidMount();
  }

  async handleDelete(id){
    await fetch(`http://localhost:3000/todo/${id}`, {
      'method': 'DELETE'
    });
    this.componentDidMount();
  }

  handleNewInput(taskId){
    this.setState({ edit: !this.state.edit, currentTaskId: taskId });
    this.componentDidMount();
  }

  async handleEditSubmit(id, newValue){
    await fetch(`http://localhost:3000/todo/${id}`, {
      'method': 'PATCH',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({ 'name': newValue })
    });
    this.setState({ edit: !this.state.edit });
    this.componentDidMount();
  }

  render(){
    return (
      <div>
        <input type="text" placeholder="Enter a new task here..." value={this.state.newTask} onChange={(e) => {
          this.setState({ newTask: e.target.value })
        }} />
        <button onClick={() => this.handleSubmit(this.state.newTask)}>Submit</button> <br />
        <Todos tasks={this.state.tasks} handleDelete={this.handleDelete} handleNewInput={this.handleNewInput} edit={this.state.edit} handleEditSubmit={this.handleEditSubmit} currentTaskId={this.state.currentTaskId} />
      </div>
    );
  }

};