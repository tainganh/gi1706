import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {

    constructor(props){
      super(props);
      this.state ={
        tasks : [],
        isDisplayForm: false
      }
    }
    //No se duoc goi khi component duoc gan vao va chi duoc goi duy nhat 1 lan
    componentWillMount(){
      if(localStorage && localStorage.getItem('tasks')){
        var tasks= JSON.parse(localStorage.getItem('tasks'));// parse de chuyen thanh mot object
            this.setState({
              tasks : tasks
            });
      }
    }
    onGenerateData = ()=>{
      var tasks = [
        {
          id : this.generateID(),
          name: 'hoc lap trinh',
          status :true

        },
        {
          id : this.generateID(),
          name: 'di thai',
          status :true

        },
        {
          id : this.generateID(),
          name: 'di san',
          status :false

        }
      ];
      this.setState({
          tasks: tasks
      });
      //chua chuyen thanh string
      // localStorage.setItem('tasks',tasks)
      localStorage.setItem('tasks',JSON.stringify(tasks))
      console.log(tasks);
    }

    s4(){
      return Math.floor((1+Math.random()) *0x1000).toString(16).substring(1);
    }
    generateID(){
      return this.s4() + this.s4() + '-' +this.s4() + '-'+this.s4() + '-'+this.s4() + '-'+this.s4() +this.s4() +this.s4() ;

    }
    onThemcongviec = ()=>{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm
      });
    }
    onCloseForm = ()=>{
      this.setState({
        isDisplayForm: false
      });
    }
  render() {
    
    var {tasks, isDisplayForm} =this.state; // tuong duong voi var tasks=this.state.tasks;
    var elmTaskForm= isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm}/> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm? 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
                                       : ''}>
               {/* <TaskForm/> */}
               {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                                        : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button"
                    className="btn btn-primary" 
                    onClick={this.onThemcongviec}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <button 
                type="button" 
                className="btn btn-success ml-5"
                onClick={this.onGenerateData}
                >
              Generate Data
            </button>
            {/* Search và sort */}
                <Control/>
            {/* Table List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                 <TaskList tasks={tasks}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
