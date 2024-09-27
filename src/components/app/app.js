import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "John D",
          salary: 800,
          increase: true,
          rise: false,
          id: uuidv4(),
        },
        {
          name: "Mike W",
          salary: 2500,
          increase: false,
          rise: true,
          id: uuidv4(),
        },
        {
          name: "Liza K",
          salary: 3000,
          increase: true,
          rise: false,
          id: uuidv4(),
        },
        {
          name: "Kira F",
          salary: 900,
          increase: false,
          rise: false,
          id: uuidv4(),
        },
      ],
    };
  }
  deleteItem = (id) => {
    this.setState(({ data }) => {
      //send updated Array
      // const index = data.findIndex((elem) => elem.id == id);
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after];
      // return {
      //   data: newArr,
      // };

      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };
  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      id: uuidv4(),
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return { data: newArr };
    });
  };
  // onToggleIncrease = (id) => {
  //   //1st solution:
  //   // this.setState(({ data }) => {
  //   // const index = data.findIndex((e) => e.id === id);
  //   // const old = data[index];
  //   // const newItem = { ...old, increase: !old.increase };
  //   // const newArray = [
  //   //   ...data.slice(0, index),
  //   //   newItem,
  //   //   ...data.slice(index + 1),
  //   // ];
  //   // return {
  //   //   data: newArray,
  //   // };
  //   // });

  //   //2nd Faster Solution
  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, increase: !item.increase };
  //       }
  //       return item;
  //     }),
  //   }));
  // };
  // onToggleRise = (id) => {
  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, rise: !item.rise };
  //       }
  //       return item;
  //     }),
  //   }));
  // };

  //Refactor the same function in onToggleIncrease and onToggleRise
  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };
  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
