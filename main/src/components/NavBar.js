import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

class Navbar extends React.Component {
  state = { clicked: false };

  //set clicked value to change true/false everytime it's clicked
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <Link className="navbartitle" to="/">
          <img src={"small-logo.png"} width="70" height="70" />
        </Link>

        {/* function that will recognize user click and change menu img from 3 layer icon to 'x'. Also the naming has to 'fas fa-' according to fontawesome */}
        <div className="menuicon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        {/* className changes based on user-click on menu icon, this is for mobile view css */}
        <ul className={this.state.clicked ? "navmenu active" : "navmenu"}>
          <NavbarButtons></NavbarButtons>
        </ul>
      </nav>
    );
  }
}

class NavbarButtons extends Navbar{
  constructor(){
    super();
    this.state = {foo: true};
  }

  render(){
    if(this.state.foo){
      return super.render();
    }
    return(
      <div>
            <li>
              <Link className="navlinks" to="/login">
                Log In
              </Link>
            </li>
            <li>
              <Link className="navlinks" to="/outages">
                View Outages
              </Link>
            </li>
            <li>
              <Link className="navlinks" to="/signup">
                Sign Up
              </Link>
            </li>
      </div>
    )
  }
}

export default Navbar;
