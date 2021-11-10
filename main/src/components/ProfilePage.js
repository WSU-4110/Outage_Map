//profile page, with user reported outages and closed outages
import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";


function UserProfile(props){
    const userID = useSelector(state => state.userID);

    //user profile variables
    const [profile, setProfile] = useState('')
    const userProf = props.match.params.userProf

    const userVar={userProf:userProf}

    useEffect(()=>{
        axios.post(/*'api/users/getProfile'*/, userVar)//will need to pull from database
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setProfile(response.data.userID)            
            } else {
                alert('Failed to get user info')
            }
        })
    }

    )
    return(
        <div>
            <h1>Profile</h1>
            <h2>Email: </h2>
            <h3>Password: </h3>
        </div>
    )
    function UserReports{

    }
    function UserClosedReports{
    
    }
};

export default UserProfile;