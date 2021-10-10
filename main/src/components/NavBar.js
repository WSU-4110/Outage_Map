import React from 'react'
import '../css/NavBar.css'

class Navbar extends React.Component {
    state = {clicked: false}

    //set clicked value to change true/false everytime it's clicked 
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navbartitle">
                    Outage Map 
                    {/* <i className="fab fa-react"></i> */}
                </h1>

                {/* function that will recognize user click and change menu img from 3 layer icon to 'x'. Also the naming has to 'fas fa-' according to fontawesome */}
                <div className="menuicon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                {/* className changes based on user-click on menu icon, this is for mobile view css */}
                <ul className={this.state.clicked ? 'navmenu active' : 'navmenu'}>
                    <li>
                        <a className="navlinks" href='#'>Home</a>
                    </li>
                    <li>
                        <a className="navlinks" href='#'>View Outages</a>
                    </li>
                    <li>
                        <a className="navlinks" href='#'>Report Outage</a>
                    </li>
                    <li>
                        <a className="navlinks" href='#'>Sign Up</a>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Navbar