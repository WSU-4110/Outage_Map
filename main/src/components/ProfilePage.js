//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "../css/profile.css";

function Profile() {
    return (
        <div className="pv-col-border">
            <h2 className="ptab-row">Profile for:</h2>
            <p className="ptab-row" style={{ color: 'orange' }}>test@test.com</p>
        <Tabs className="profile-tabbed-view">
        <TabList className="nth child">
          <Tab className="profileview-tab ptab-ms-c tab-button li">Reported Outages</Tab>
          <Tab className="profileview-tab ptab-ms-c tab-button li">Closed Outages</Tab>          
        </TabList>

        <TabPanel className="profileview-tab-list">
          <div className="content">
            <p>Reported outages are saved here as a list</p>
               </div>
        </TabPanel>
        <TabPanel className="profileview-tab-list">
          <div className="content">
            <p>Closed reports associated with user account are saved here as a list</p>
          </div>
        </TabPanel>
      </Tabs>
        </div>
    )
}
export default withRouter (Profile);