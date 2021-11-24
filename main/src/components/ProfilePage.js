//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import TabContent from 'react-bootstrap/TabContent'
import "../css/profile.css";

function Profile() {
    return (
        <div className="mt-3 mx-2 w-3">
            <h2 className="mt-3 mb-0 mx-4">Profile for:</h2>
            <p className="m-1 mx-4 w-auto" style={{ color: 'orange' }}>test@test.com</p>
        <Tabs
            defaultActiveKey="report"
            variant="fullWidth"
            transition={false} 
            className="profile-tabbed-view mx-1 w-100">
        <TabList className="mt-3 mx-4">
          <Tab className="profileview-tab ptab-ms-c tab-button">Reported Outages</Tab>
          <Tab className="profileview-tab ptab-ms-c tab-button">Closed Outages</Tab>          
        </TabList>

        <TabPanel>
            <TabContent style={{color:'white'}}>Reported outages are saved here as a list</TabContent>            
        </TabPanel>
        <TabPanel>     
          <TabContent style={{color:'white'}}>Closed outages will save here</TabContent>        
        </TabPanel>
      </Tabs>
        </div>
    )
}
/*function Tab({ children, active = 0 }) {
    const [activeTab, setActiveTab] = useState(active); //state active tab
    const [tabsData, setTabsData] = useState([]);     //data held in tab
    useEffect(() => {
        let data = [];

        React.Children.forEach(children, element => {
            if (!React.isValidElement(element))
                return;

            const { props: { tab, children } } = element;
            data.push({ tab, children });
        });
        setTabsData(data);
    }, [children]); //dependancy of useEffect
    const tabContent = [
        {
            title: "Reported Outages",
            content: `Reported outages coming from user content`,
        },
        {
            title: "Closed Outages",
            content: `Closed outages from user content`,
        },
    ];

    return (
        <div className="tab-content">
            <ul className="nav nav-tabs">
                {tabsData.map(({ tab }, idx) => (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${idx === activeTab ? "active" : ""}`}
                            href="#" onClick={() => setActiveTab(idx)}
                        >
                            {tab}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabsData[activeTab] && tabsData[activeTab].children}
            </div>
        </div>
    );
}
function TabPane({ children }) {
    return { children };

}

Tab.TabPane = TabPane; //static component for how many tabs for render

function TabView (tabContent) {
    return (
        <div className="row">
            <div className="col text-center">
                <h2>User Outages</h2>
                <div className="row text-left">
                    <Tab active={1}>
                        {tabContent.map((tab, idx) => (
                            <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                                {tab.content}
                            </Tab.TabPane>
                        ))}
                    </Tab>
                </div>
            </div>
        </div>
    );
}*/
export default withRouter(Profile);