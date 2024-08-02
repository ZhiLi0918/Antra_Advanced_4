import { Component } from "react"

  export default class Todos extends Component{
  
    constructor(props){
      super(props);
      this.state = {
        inputValue: ''
      }
      this.addNewTask = this.addNewTask.bind(this);
    }

    addNewTask(e){
      this.setState({ inputValue: e.target.value });
    }

    render(){
      const { tasks, handleDelete, handleNewInput, edit, handleEditSubmit, currentTaskId } = this.props;
      const { inputValue } = this.state;

      return (
        <ul>
          { tasks.map(task => (
                <div key={task.id} style={{ 'display': 'flex', 'listStyle': 'none', 'gap': '10px' }}>
                  <li>{task.name}</li>
                  <button onClick={() => handleDelete(task.id)}>Delete</button> 
                  <button onClick={() => handleNewInput(task.id)}>Edit</button>
                  { edit && currentTaskId === task.id && (<><input type="text" onChange={this.addNewTask}/> <button onClick={() => handleEditSubmit(task.id, inputValue)}>Submit</button></>) }
                </div>  
          )) }
        </ul>
      )
    }

}