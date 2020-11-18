import React from "react";
import "./add-item.css";

const AddItem = ({ addItem }) => {
  return (
    <div className="add-item-form">
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => addItem("HEY")}
      >
        HEY
      </button>
    </div>
  );
};

export default AddItem;
