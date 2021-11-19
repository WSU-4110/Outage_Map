//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "../css/profile.css";
import axios from "axios";

function Profile() {
    //classes used instead of interfaces
    //observer class for reported outages
    class observerReports{
        update(){}
    }
    //observer class for closed outages
    class observerClosedReports{
        update(){}
    }
    class subject{
        constructor(){
            this.observed=[]
        }
        getReportData();
    }
    //reports data extend from subject class
    class reportData extends subject{
        super();
        this.state = {
            reports:{}
        }
    };
    getReportData(){
        useEffect(()=>{
            async function fetchOutages(){
                const resp = await axios.get("/outages");
                this.state.reports=resp.data.reports;
            }
            fetchOutages();
        })
    }
    //profile view
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