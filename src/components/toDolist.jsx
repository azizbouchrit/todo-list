import React, { Component } from "react";
import "./toDolist.css";
import ToDoItem from "./toDoItem";
import axios from "axios";

class ToDolist extends Component {
  state = {
    toDolist: [],
    data: { id: null, title: "", completed: false },
  };

  async componentDidMount() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.log(data);
    this.setState({ toDolist: data, mainToDoList: data });
  }

  handleChange = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    data.id = Date.now();
    this.setState({ data });
  };

  handleCheck = async (id) => {
    const toDolist = this.state.toDolist;
    const index = toDolist.findIndex((item) => item.id === id);
    toDolist[index].completed = !toDolist[index].completed;
    console.log("clicked");

    try {
      const { data } = await axios.put(
        "https://jsonplaceholder.typicode.com/todos/" + id,
        toDolist[index]
      );
      console.log(data, "successfully changed");
      toDolist[index] = data;
      this.setState({ toDolist });
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    if (data.title !== "") {
      await axios.post("https://jsonplaceholder.typicode.com/todos/", data);
      try {
        console.log("successfully added");
        const toDolist = [data, ...this.state.toDolist];
        this.setState({ toDolist, data: { title: "", id: null } });
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleDelete = async (listItem) => {
    const toDolist = this.state.toDolist.filter(
      (item) => item.id !== listItem.id
    );
    try {
      await axios.delete(
        "https://jsonplaceholder.typicode.com/todos/" + listItem.id
      );
      console.log("successfully deleted");
      this.setState({ toDolist });
    } catch (err) {
      console.log(err);
    }
  };

  handleEdit = (listItem) => {
    const toDolist = this.state.toDolist;
    const index = toDolist.findIndex((item) => item.id === listItem.id);
    toDolist[index] = listItem;
    this.setState({ toDolist });
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)} className='add-item-form'>
          <input
            value={this.state.data.title}
            name='title'
            className='form-control'
            type='text'
            placeholder='Add to do item'
            onChange={this.handleChange}
          />
          <button
            disabled={this.state.data.title === ""}
            className='btn btn-primary ml-3'
          >
            ADD
          </button>
        </form>
        <ul className='list-group mt-4'>
          {this.state.toDolist.map((listItem) => (
            <ToDoItem
              key={listItem.id}
              listItem={listItem}
              handleCheck={this.handleCheck}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          ))}
        </ul>
      </div>
    );
  }
}
export default ToDolist;
