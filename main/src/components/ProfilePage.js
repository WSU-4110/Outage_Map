//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import TabContent from 'react-bootstrap/TabContent'
import "../css/profile.css";

function Profile() {
    
    //shows the profile for user email
    return (
        <div className="mt-3 mx-2 w-3">
            <h2 className="mt-3 mb-0 mx-4">Profile for:</h2>            
            <p className="m-1 mx-4 w-auto" style={{ color: 'orange' }}>test@test.com</p> 
        
        <Tabs //tabbed data
            variant="fullWidth"
            className="mx-1 w-100"
            position="static">
        
        <TabList className="mt-3 mx-4"> 
          <Tab className="profiletab tab-button">Reported Outages</Tab>
          <Tab className="profiletab tab-button">Closed Outages</Tab>          
        </TabList>

        <TabPanel className="tab-content">
            <TabContent style={{color:'white'}}>Reported outages</TabContent>            
        </TabPanel>
        <TabPanel className="tab-content">     
          <TabContent style={{color:'white'}}>Closed outages will save here</TabContent>        
        </TabPanel>
      </Tabs>
        </div>
    )
}
export default withRouter(Profile);