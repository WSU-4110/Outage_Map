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