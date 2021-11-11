//profile page, with user reported outages and closed outages
import React from "react";
import {Button, Input, Card, CardHeader, CardContent, Form, Listview, TabNav, NavItem} from "react";
import { useHistory, withRouter } from "react-router-dom";
//import moment from "moment"; //for date formatting
import { useState, useEffect } from "react";
import "../css/profile.css";

class ListItem extends React.Component {
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
        }
        return (
            <Form className="profile-tabbed-view">
                <div className="ptab-grid ptab-no-padding">
                    <div className="ptab-row">
                        <div className="ptab-col-12 ptab-col-md-2 ptab-col-sm-3">
                            <Listview select="single" itemType={ListItem} data={this.state.person} onItemTap={this.changeUser} />
                        </div>
                        <div className="ptab-col-12 ptab-col-md-10 ptab-col-sm-9 pv-col-border">
                            <TabNav display="inline">
                                <NavItem selected={this.state.selectedTab === 'profile'} onClick={this.selectTab.bind(null, 'profile')}>Profile</NavItem>
                                <NavItem selected={this.state.selectedTab === 'repOutage'} onClick={this.selectTab.bind(null, 'repOutage')}>Reported Outage</NavItem>
                                <NavItem selected={this.state.selectedTab === 'closOutage'} onClick={this.selectTab.bind(null, 'closOutage')}>Closed Outage</NavItem>
                            </TabNav>
                            {content}
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
    
     
    
    selectTab = (newTab) => {
        this.setState({ selectedTab: newTab });
    }
    
    /*changeUser = (event, inst) => {
        this.setState({ selectedUser: this.state.data[event.index]});
    }*/
    
    changeFirstName = (event) => {
        const updatedUser = this.state.selectedUser;
        updatedUser.first = event.target.value;

        this.setState({ selectedUser: updatedUser });
    }
    
    
    changeEmail = (event) => {
        const updatedUser = this.state.selectedUser;
        updatedUser.email = event.target.value;

        this.setState({ selectedUser: updatedUser });
    }
    
    
    
    //shows the report date
    /*formatDate(date:any) {
        return(
            util.datetime.formatDate('D, d h:ii A', new Date(date))
        ); 
    }*/
    //pulls closed outages for the user
    /*closOutages = (index) => {
        const updatedUser = this.state.selectedUser;
        updatedUser.tasks[index] = event.target.checked;
        
        this.setState({ selectedUser: updatedUser });
    }*/
}
export default withRouter(Profile);