import React, { useState } from "react";

function CheckList(props:any) {
    // State with list of all checked item
    const [checked, setChecked]:any = useState([]);
    const checkList = props.checkList;
    // Add/Remove checked item from list
    const handleCheck = (event:any) => {
      let updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }
      props.setSelected(updatedList);
      setChecked(updatedList);
    };
  
    // Return classes based on whether item is checked
    let isChecked = (item:any) =>
      checked.includes(item) ? "checked-item" : "not-checked-item";
  
    return (
        <div className="checkList">
          <h3 className="title">{props.nameOfList}</h3>
          <div className="list-container">
            {checkList.map((item:any, index:any) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
          </div>
        </div>
    );
  }
  
  export default CheckList;