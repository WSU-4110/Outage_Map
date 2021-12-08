//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import { TabContent } from 'react-bootstrap'
import axios from "axios";
import "../css/profile.css";

function Profile() {
   const [selectTab, setSelectTab] = useState('reported');
   const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("user")));

   console.log(loggedInUser);

   const handleChange = (event, newSelect) => {
     setSelectTab(newSelect);
   }
   let history = useHistory();
   useEffect(()=>{
     const foundUser = loggedInUser?.foundUser;
     
      setLoggedInUser(JSON.parse(localStorage.getItem("user")));       
    }, []);

    //shows the profile for user email
    return (
      <div className="mt-3 mx-2 w-3">
            <h2 className="mt-3 mb-0 mx-4">Profile for:</h2>            
            <p className="m-1 mx-4 w-auto" style={{ color: 'orange' }}>{JSON.parse(localStorage.getItem("user"))}</p>

        <Tabs //tabbed data
          value = {selectTab} 
          onSelect={handleChange}
          className="mx-1 w-100"
          centered="true">
        
        <TabList> 
          <Tab eventKey="reported" className="profiletab">Reported Outages</Tab>
          <Tab eventKey="closed" className="profiletab">Closed Outages</Tab>          
        </TabList>

        <TabPanel className="tabscontent">
            <TabContent style={{color:'white'}}>Reported outages</TabContent>            
        </TabPanel>
        <TabPanel className="tabscontent" >     
          <TabContent style={{color:'white'}}>Closed outages will save here</TabContent>        
        </TabPanel>
      </Tabs>
        </div>
    )
}
export default withRouter(Profile);