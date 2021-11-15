//profile page, with user reported outages and closed outages
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/profile.css";

function Profile() {
    
    function Tab({ children, active = 0 }) {
        const [activeTab, setActiveTab] = useState(active); //state active tab
        const [tabsData, setTabsData] = useState([]); //data held in tab

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
    }
    
    return (
        <div className="profileview-tab">
            <h2 className="ptab-row">Profile for:</h2>
            <p className="profileview-tab" style={{ color: 'orange' }}>test@test.com</p>
        </div>
    );
}


export default withRouter(Profile);
/*class ListItem extends React.Component {
    render() {
         return <li data-selected={this.props.item.selected}>{this.props.item.name}</li>;
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: [
                { id: 0, name: 'User Name', selected: true },//pulls username as email
            ],
            selectedUser: null,
            selectedTab: 'profile',
            data: []
        } 
        
        //this.getData();
    }
    
    render() {
        let content;
        const selectedUser = this.state.selectedUser;
        
        switch (this.state.selectedTab) {
            case 'profile': //profile info
                if(selectedUser !== null) {
                    content = <div className="ptab-form-grid">
                         <Card>
                            <CardContent>
                                <div className="ptab-row">
                                    <div className="ptab-col-md-6 ptab-col-12">
                                        <Input value={selectedUser.email} onChange={this.changeEmail} inputStyle="box" labelStyle="floating">Email</Input>
                                    </div>
                                </div>                               
                                <div className="ptab-row ptab-justify-content-end">
                                    <div className="ptab-col-md-6 ptab-col-12">
                                        <div className="ptab-pull-right ptab-btn-group">
                                            <Button color="primary">Update</Button>
                                           
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                }
                break;
            case 'repOutage': //user reported outages 
                if(selectedUser !== null) {
                    content = <div className="ptab-form-grid">
                        {selectedUser.conv.map((conv, key) => {
                            return (
                                <div key={key}>
                                    <Card collapsible open>
                                        <CardHeader>
                                            <span className="ptab-bold">{conv.title}</span>
                                            <span className="ptab-pull-right ptab-card-subtitle">{this.formatDate(conv.date)}</span>
                                        </CardHeader>
                                        <CardContent>{conv.text}</CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                }
                break;
            case 'closOutage': //user reported closed outages
                if(selectedUser !== null) {
                    const selectedUser = this.state.selectedUser;
                    content = <div className="ptab-form-grid">
                        <Card>
                            <CardHeader>
                                <h2 className="ptab-card-title">Closed Reported Outages</h2>
                            </CardHeader>
                            <CardContent className="ptab-no-padding">
                                
                            </CardContent>
                        </Card>
                    </div>
                }
                break;
            default:
                return 0;
        }*/
//         return (
//             <Form className="profile-tabbed-view">
//                 <div className="ptab-grid ptab-no-padding">
//                     <div className="ptab-row">
//                         <div className="ptab-col-12 ptab-col-md-2 ptab-col-sm-3">
//                             <Listview select="single" itemType={ListItem} data={this.state.person} onItemTap={this.changeUser} />
//                         </div>
//                         <div className="ptab-col-12 ptab-col-md-10 ptab-col-sm-9 pv-col-border">
//                             <TabNav display="inline">
//                                 <NavItem selected={this.state.selectedTab === 'profile'} onClick={this.selectTab.bind(null, 'profile')}>Profile</NavItem>
//                                 <NavItem selected={this.state.selectedTab === 'repOutage'} onClick={this.selectTab.bind(null, 'repOutage')}>Reported Outage</NavItem>
//                                 <NavItem selected={this.state.selectedTab === 'closOutage'} onClick={this.selectTab.bind(null, 'closOutage')}>Closed Outage</NavItem>
//                             </TabNav>
//                             {/* /{content} */}
//                         </div>
//                     </div>
//                 </div>
//             </Form>
//         );
//     }
    
     
    
//     selectTab = (newTab) => {
//         this.setState({ selectedTab: newTab });
//     }
    
//     /*changeUser = (event, inst) => {
//         this.setState({ selectedUser: this.state.data[event.index]});
//     }*/
    
//     changeFirstName = (event) => {
//         const updatedUser = this.state.selectedUser;
//         updatedUser.first = event.target.value;

//         this.setState({ selectedUser: updatedUser });
//     }
    
    
//     changeEmail = (event) => {
//         const updatedUser = this.state.selectedUser;
//         updatedUser.email = event.target.value;

//         this.setState({ selectedUser: updatedUser });
//     }
    
    
    
//     //shows the report date
//     /*formatDate(date:any) {
//         return(
//             util.datetime.formatDate('D, d h:ii A', new Date(date))
//         ); 
//     }*/
//     //pulls closed outages for the user
//     /*closOutages = (index) => {
//         const updatedUser = this.state.selectedUser;
//         updatedUser.tasks[index] = event.target.checked;
        
//         this.setState({ selectedUser: updatedUser });
//     }*/
// }

