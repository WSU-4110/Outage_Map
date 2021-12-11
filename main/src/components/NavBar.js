import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

class Navbar extends React.Component {
  state = {clicked: false};
  //set clicked value to change true/false everytime it's clicked
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const localUser = localStorage.getItem("user");
    
    // checks if user is logged in. If user is not logged in, the navbar will display the buttons "Log In", "View Outage", and "Sign Up". Otherwise it will display "Log Out" and "View Outages".
    // localUser check is sufficient since localUser gets cleared when the user is not logged in
    if(!localUser){ 
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
          <li>
            <Link className="navlinks" to="/login">
              Log In
            </Link>
          </li>
          <li>
            <Link className="navlinks" to="/profile">
              Profile
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
        </ul>
      </nav>
    );
  }
    else
    {
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
            <li>
              <Link className="navlinks" to="/login">
                Log Out
              </Link>
            </li>
            <li>
              <Link className="navlinks" to="/outages">
                View Outages
              </Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default Navbar;
