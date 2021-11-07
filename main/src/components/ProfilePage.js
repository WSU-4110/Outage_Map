//profile page, with user reported outages and closed outages
import React from "react";
import axios from "axios";
import "../components/userLogin";

function UserProfile(props){
    return(
        <div className="Profile">
            <h1 className="UserName">{this.props.email}</h1>
            <h2 className="Password">{this.props.pwd}</h2>
        </div>

    )
}