import React from 'react';
import '../Styles/Header.scss'


function Header(): JSX.Element {

  //Render the page header
  return (
    <div className="header">
      <h1>FlyNow</h1>
      <img alt="" src="plane.png"></img>
    </div>
  );
}

export default Header;