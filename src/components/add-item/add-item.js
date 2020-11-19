import React, { Component } from "react";
import "./add-item.css";

export default class AddItem extends Component {

  state = {
    fieldValue: ''
  }

  onLabelChange = (evt) => {
    this.setState({
      fieldValue: evt.target.value,
    });
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.addItem(this.state.fieldValue);
    this.setState({
      fieldValue: ''
    });
  };

  render() {

    return (
      <form className="add-item-form d-flex"
        onSubmit={this.onFormSubmit}>
        <input type="text"
          className="form-control"
          placeholder="What need to be done?"
          onChange={this.onLabelChange}
          value={this.state.fieldValue} />
        <button
          className="btn btn-outline-secondary"
          type="submit"
        >
          Add Item
      </button>
      </form>
    );
  };
}
