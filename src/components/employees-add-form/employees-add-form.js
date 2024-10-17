import { Component } from "react";
import "./employees-add-form.css";

class EmployeesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
    };
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateForm = () => {
    const { name, salary } = this.state;
    // Regular expression to allow only letters and spaces
    const namePattern = /^[A-Za-z\s]+$/;

    if (!name && !salary) return "Please add both name and salary.";
    if (!name) return "Name is required.";
    if (!salary) return "Salary is required.";
    if (!namePattern.test(name))
      return "Name can only include letters and spaces.";
    if (name.length < 4) return "Full Name must be at least 4 characters long.";

    return null;
  };

  onSubmit = (e) => {
    e.preventDefault();
    // Validate form
    const errorMessage = this.validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    const { name, salary } = this.state;
    this.props.onAdd(name, salary);
    this.setState({
      name: "",
      salary: "",
    });
  };
  render() {
    const { name, salary } = this.state;
    return (
      <div className="app-add-form">
        <h3>Add a new employee</h3>
        <form className="add-form d-flex" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.onValueChange}
          />
          <input
            type="number"
            className="form-control new-post-label"
            placeholder="Salary, £"
            name="salary"
            value={salary}
            onChange={this.onValueChange}
          />

          <button type="submit" className="btn btn-outline-light">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeesAddForm;
