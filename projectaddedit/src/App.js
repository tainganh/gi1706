import React, { Component } from "react";
import "./App.css";
import Taskform1 from "./components/Taskform1";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import _ from "lodash"; //import tat ca thu vien cua lodash
import { findIndex, filter } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1
      },
      keyword: "",
      sortBy: "name",
      value: 1
    };
  }
  //No se duoc goi khi component duoc gan vao va chi duoc goi duy nhat 1 lan va
  //no co chuc nang do du lieu tu localstorage vao state
  // Được gọi trước khi render().
  // Dùng để đăng ký các sự kiện toàn cục.
  // Dựa vào các props để tính toán và set lại state
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks")); // parse de chuyen thanh mot object
      this.setState({
        tasks: tasks
      });
    }
  }
  // onGenerateData = ()=>{
  //   var tasks = [
  //     {
  //       id : this.generateID(),
  //       name: 'hoc lap trinh',
  //       status :true

  //     },
  //     {
  //       id : this.generateID(),
  //       name: 'di thai',
  //       status :true

  //     },
  //     {
  //       id : this.generateID(),
  //       name: 'di san',
  //       status :false

  //     }
  //   ];
  //   this.setState({
  //       tasks: tasks
  //   });
  //   //chua chuyen thanh string
  //   // localStorage.setItem('tasks',tasks)
  //   localStorage.setItem('tasks',JSON.stringify(tasks))
  //   console.log(tasks);
  // }

  s4() {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
  onShowformofThemcongviec = () => {
    if (this.state.isDisplayForm === true && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  };
  onSubmit = data => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data); //them vao cuoi mang
    } else {
      //Editing
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onUpdateStatus = id => {
    var { tasks } = this.state;
    var index = findIndex(tasks, task => {
      //thu vien thu 3 lodash
      return task.id === id;
    });
    if (index !== -1) {
      // mang bat dau tu 0 nen khac -1 la tim dc
      tasks[index].status = !tasks[index].status; //tasks[index] co ngia la vi tri index da tim dc trong mang tasks
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
  // findIndex = (id) =>{
  //   var {tasks} =this.state;
  //   var resulindex = -1;
  //   tasks.forEach((task, index) =>{
  //     if(task.id === id ){
  //       resulindex= index;
  //     }
  //   });
  //   return resulindex;
  // }
  onDelete = id => {
    var { tasks } = this.state;
    var index = findIndex(tasks, task => {
      //thu vien thu 3 lodash
      return task.id === id;
    });
    if (index !== -1) {
      // mang bat dau tu 0 nen khac -1 la tim dc
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  };
  // khi click vao button update thi se tim ra index va gan tasksEditing trong state
  onUpdate = id => {
    var { tasks } = this.state;
    var index = findIndex(tasks, task => {
      //thu vien thu 3 lodash
      return task.id === id;
    });
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  };
  onFilter = (filterName, filterStatus) => {
    console.log(filterName, filterStatus);
    filterStatus = parseInt(filterStatus, 10); //10 la radix he thap phan
    // console.log(typeof filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  };
  onSearch = keyword => {
    this.setState({
      keyword: keyword
    });
  };
  onSort = (sortbyName, sortValue) => {
    this.setState({
      sortBy: sortbyName,
      value: sortValue
    });
  };
  render() {
    var {
      tasks,
      isDisplayForm,
      taskEditing,
      filter,
      keyword,
      sortBy,
      value
    } = this.state; //ES6. tuong duong voi var tasks=this.state.tasks;
    if (filter !== null) {
      if (filter.name !== null) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1; // chuyen thanh chu thuong va kiem tra xem co filter.name khong
        });
      }
      // if(filter.status !==null){// !== null, !== undified, !== 0( 0 la an)
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (keyword !== null) {
      tasks = _.filter(tasks, task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1; // chuyen thanh chu thuong va kiem tra xem co filter.name khong
      });
    }
    if (sortBy === "name") {
      tasks.sort(function(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -value;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return value;
        }
        return 0;
      });
    } else {
      tasks.sort(function(a, b) {
        if (a.status < b.status) return value;
        if (a.status > b.status) return -value;
        return 0;
      });
    }
    var elmTaskForm = isDisplayForm ? (
      <Taskform1
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/* <TaskForm/> */}
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onShowformofThemcongviec}
            >
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            {/* <button 
                type="button" 
                className="btn btn-success ml-5"
                onClick={this.onGenerateData}
                >
              Generate Data
            </button> */}
            {/* Search và sort */}
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={this.state.sortBy}
              sortValue={this.state.value}
            />
            {/* Table List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
