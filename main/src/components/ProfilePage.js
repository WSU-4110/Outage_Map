//profile page, with user reported outages and closedrepo outages
import React from "react";
import { useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import { TabContent } from 'react-bootstrap'
import moment from "moment";
import axios from "axios";
import "../css/profile.css";

function Profile() {
  //set loggedInUser from localstorage
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("user")));
  //set table outages
  const [tableOutage, setTableOutage] = useState([]);
  
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
      const resp = await axios.post("/profile", {
        user_email: `${loggedInUser}`,
      });
      setTableOutage(resp.data.profile);

      console.log(tableOutage);
  }
    fetchOutages();
  }, []);
  
  //table data content from server
  const tabData =  {
    //open reports table
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
                 {tableOutage.map((cell) =>  {
                   
                   return (cell.outage_status==="Open")?<tr key={cell.Id}>                  
                     <td>{cell.service_type}</td>
                     <td>{cell.service_name}</td>
                     <td>{cell.outage_description}</td>
                     <td>{cell.outage_status}</td>
                     <td>{moment(cell.date_created).format("DD/MM/YYYY")}</td>
                   </tr>:null;
                 })}
               </tbody>
             </table>         
        )    
    },
    //closed report table
  "closedrepo": {
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
              {tableOutage.map((cell) => {
                return (cell.outage_status==="Closed" && cell.user_email===loggedInUser)?<tr key={cell.Id}>
                <td>{cell.service_type}</td>
                <td>{cell.service_name}</td>
                <td>{cell.outage_description}</td>
                <td>{cell.outage_status}</td>
                <td>{moment(cell.date_created).format("DD/MM/YYYY")}</td>
              </tr>:null;
              })}
            </tbody>
          </table>        
      )    
  }
}

  
    //shows the profile for user email
    return (
      
      <div className="mt-3 mx-2 w-3">
      
            
         
        <Tabs //tabbed data
          tabData="true"
          onChange={handleTab}
          className="mx-1 w-100"
          centered="true">
          {/* tab list open and closed tabbuttons */}
          
          <TabList>
            <Tab className="profiletab">
              {tabData["reported"].title}
            </Tab>
            <Tab className="profiletab">
              {tabData["closedrepo"].title}
            </Tab> 
          </TabList>

          <TabPanel className="tabscontent">
            {/* data content only that is open */}            
            <TabContent style={{ color: 'white' }}>
              {tabData["reported"].content}
            </TabContent>
          </TabPanel>
          <TabPanel className="tabscontent">
              {/* data content only that is closed */}
              <TabContent style={{ color: 'white' }}>
                {tabData["closedrepo"].content}               
              </TabContent>
            </TabPanel>
        </Tabs>       
 
      </div>
      
    )
}
export default Profile;