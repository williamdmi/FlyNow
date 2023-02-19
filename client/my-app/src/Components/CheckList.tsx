import React, { useState } from "react";

function CheckList(props:any) {
    // State with list of all checked item
    const [checked, setChecked]:any = useState([]);
    const checkList = props.checkList;
    // Add/Remove checked item from list
    const handleCheck = (event:any) => {
      var updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }
      props.setSelected(updatedList);
      setChecked(updatedList);
    };
  
    // Return classes based on whether item is checked
    var isChecked = (item:any) =>
      checked.includes(item) ? "checked-item" : "not-checked-item";
  
    return (
      <div className="app">
        <div className="checkList">
          <div className="title">{props.nameOfList}</div>
          <div className="list-container">
            {checkList.map((item:any, index:any) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default CheckList;