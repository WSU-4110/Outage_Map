//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import { TabContent } from 'react-bootstrap'
import axios from "axios";
import "../css/profile.css";

function Profile({outage}) {
  //set tabs states
  const [selectTab, setSelectTab] = useState("reported");   
  
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("user")));
   
  //set table outages
  const [tableOutage, setTableOutage] = useState([]);

  function handleChange(event, newSelect) {
    setSelectTab(newSelect);
  }
   //let history = useHistory();
   
   useEffect(() => {
    async function fetchOutages() {
      const resp = await axios.get("/outages");
      setTableOutage(resp.data.outages);
    }
    fetchOutages();
  }, []);
   
    //shows the profile for user email
    return (
      <div className="mt-3 mx-2 w-3">
            <h2 className="mt-3 mb-0 mx-4">Profile</h2>            
            <p className="m-1 mx-4 w-auto" style={{ color: 'orange' }}>Username: {loggedInUser}</p>

        <Tabs //tabbed data
          value = {selectTab} 
          onChange={handleChange}
          className="mx-1 w-100"
          centered="true">
        
        <TabList> 
          <Tab eventKey="reported" className="profiletab">Reported Outages</Tab>
          <Tab eventKey="closed" className="profiletab">Closed Outages</Tab>          
        </TabList>

        <TabPanel className="tabscontent">
            <TabContent style={{color:'white'}}>Reported: {tableOutage.map((val)=>{
              return <p>Service Name: {val.outage.service_name} | Outage Description: {val.outage.outage_description}</p>
             })}</TabContent>            
        </TabPanel>
        <TabPanel className="tabscontent">
            <TabContent style={{color:'white'}}>Closed: {tableOutage.map((val)=>{
              return <p>Service Name: {val.outage.service_name} | Outage Description: {val.outage.outage_description}</p>
             })}</TabContent>            
        </TabPanel>
      </Tabs>
        </div>
    )
}
export default withRouter(Profile);