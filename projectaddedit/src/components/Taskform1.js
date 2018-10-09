import React, { Component } from "react";

class Taskform1 extends Component {
  onHandCloseForm = () => {
    this.props.onCloseForm();
  };
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }
  //SE DUOC GOI COMPONENTS FORM DC GAN VAO THI lifecycle se duoc goi va do du lieu cua index tim dc len hai o imput
  componentWillMount() {
    if (this.props.task !== null) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }
  //Van nhan dc props khi components da dc gan vao
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      //!==null
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    } else if (!nextProps.task) {
      this.setState({
        id: "",
        name: "",
        status: false
      });
    }
  }
  onChange = event => {
    //Tất cả các đối tượng sự kiện DOM đều có một thuộc tính là target,
    // thuộc tính này tham chiếu đến thẻ đã phát sinh ra sự kiện đó va
    //có thể lấy thuộc tính value của thẻ này để lấy nội dung của thẻ.
    var target = event.target; //là phần tử sẽ tạo ra khi mà kích hoạt event lên element tương ứng,
    var name = target.name; //name and status
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false; // chuyen doi status thanh kieu bollean
    }
    this.setState({
      [name]: value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };
  onClear = event => {
    event.preventDefault();
    this.setState({
      name: "",
      status: false
    });
  };
  render() {
    var { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !== "" ? "Sua Cong Viec" : "Them cong viec"}
            <span
              className="fa fa-times-circle text-right"
              onClick={this.onHandCloseForm}
            />
          </h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button
                onClick={this.onSubmit}
                type="submit"
                className="btn btn-warning"
              >
                Luu
              </button>
              &nbsp;
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Taskform1;
