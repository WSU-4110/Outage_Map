//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import { TabContent } from 'react-bootstrap'
import axios from "axios";
import "../css/profile.css";

function Profile() {
  //set loggedInUser from localstorage
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("user")));
  //set table outages
  const [tableOutage, setTableOutage] = useState([]);
  const tabData = {
    "reported": {
      title: "Open Reported Outages",
      content: (         
             <table class="table">
               <thead class="thead">
                 <tr>
                 <th scope="col">Service Type</th>
                <th scope="col">Service Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Date Created</th>
                 </tr>
               </thead>
               <tbody>
                 {tableOutage.map(item =>  {
                   return <tr key={item.Id}>
                     <td>{item.service_type}</td>
                     <td>{item.service_name}</td>
                     <td>{item.outage_description}</td>
                     <td>{item.outage_status}</td>
                     <td>{item.date_created}</td>
                   </tr>;
                 })}
               </tbody>
             </table>         
        )    
    },
  "closed": {
    title: "Closed Reported Outages",
    content: (      
          <table class="table">
            <thead class="thead">
              <tr>
                <th scope="col">Service Type</th>
                <th scope="col">Service Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {tableOutage.map(item => {
                return <tr key={item.Id}>
                  <td>{item.service_type}</td>
                  <td>{item.service_name}</td>
                  <td>{item.outage_description}</td>
                  <td>{item.outage_status}</td>
                  <td>{item.date_created}</td>
                </tr>;
              })}
            </tbody>
          </table>        
      )    
  }
}
  //set tabs states
  const [selectTab, setSelectTab] = useState("reported");   
  //toggle between tabs
  
  const history = useHistory();
  //checking if the user is logged in first
  useEffect(()=>{
    const user=localStorage.getItem('user');
    if(!user){
      history.push('/login');
    }
  })
   useEffect(() => {
    if(!selectTab){
        history.push(`reported`);
    }
  }, [history, selectTab]);

  function handleTab(newSelect) {
    if (selectTab !== newSelect)
      history.push(`/${newSelect}`);
  }
   
  
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
          tabData 
          onChange={handleTab}
          className="mx-1 w-100"
          centered="true">
          
          <TabList>
            <Tab className="profiletab" {...selectTab === tabData["reported"]? "active" : ""} onChange={()=>{handleTab(tabData["reported"]);}}>{tabData["reported"].title}</Tab> 
            <Tab className="profiletab" {...selectTab === tabData["closed"]? "active" : ""} onChange={()=>{handleTab(tabData["closed"]);}}>{tabData["closed"].title}</Tab>          
          </TabList>
          <TabPanel className="tabscontent" >
            <TabContent style={{color:'white'}}>Reported: {tabData["reported"].content}</TabContent>            
          </TabPanel>
          <TabPanel className="tabscontent">
            <TabContent style={{color:'white'}}>Closed: {tabData["closed"].content}</TabContent>            
          </TabPanel> 
        </Tabs>         
      
        </div>
    )
}
export default withRouter(Profile);