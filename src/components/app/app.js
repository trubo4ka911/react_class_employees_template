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
      term: "",
      filter: "all",
    };
  }
  deleteItem = (id) => {
    this.setState(({ data }) => {
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

  searchEmp = (items, term) => {
    if (term.trim().length === 0) {
      return items;
    }
    const lowercasedTerm = term.trim().toLowerCase();
    return items.filter((item) =>
      item.name.toLowerCase().includes(lowercasedTerm)
    );
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThan1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleDate = this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleDate}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
