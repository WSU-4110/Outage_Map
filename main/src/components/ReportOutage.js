import React, { useState, useEffect } from "react";
import axios from "axios";

async function handleSubmitReport(data){
    console.log(data.serviceType);
    const res = await axios.post("/outage-new", {
        user_id: `${data.userReport}`,
        service_type: `${data.serviceType}`,
        service_name: `${data.serviceName}`,
        outage_street: `${data.serviceStreet}`,
        outage_city: `${data.serviceCity}`,
        outage_state: `${data.serviceState}`,
        outage_description: `${data.serviceDescription}`,
      });
}

function ReportOutage(){
    const [formData, setFormData] = useState({
        userReport: "",
        serviceType: "",
        serviceName: "",
        serviceStreet: "",
        serviceCity: "",
        serviceState: "",
        serviceDescription: ""
    }) //Use state hook to track what values are being inputed into the form as well as
        //setting the default values

    return (
        <>
            <h1 id="Report-Title" class>Test Dialog box</h1>
            <form onSubmit={handleSubmitReport(formData)}>
                <input type="text" placeholder="Service Type" 
                onChange={(event) => setFormData({...formData, serviceType: event.target.value})} //inline function to set formData for the form
                value={formData.serviceType}/*this is where data in the form is read*//>

                <input type="text" placeholder="Service Name"
                onChange={(event) => setFormData({...formData, serviceName: event.target.value})} 
                value={formData.serviceName}/>

                <input type="text" placeholder="Street"
                onChange={(event) => setFormData({...formData, serviceStreet: event.target.value})} 
                value={formData.serviceStreet}/>

                <input type="text" placeholder="City"
                onChange={(event) => setFormData({...formData, serviceCity: event.target.value})} 
                value={formData.serviceCity}/>

                <input type="text" placeholder="State"
                onChange={(event) => setFormData({...formData, serviceState: event.target.value})} 
                value={formData.serviceState}/>

                <input type="text" placeholder="Description"
                onChange={(event) => setFormData({...formData, serviceDescription: event.target.value})} 
                value={formData.serviceDescription}/>

                <button type="submit">Report Outage</button>
            </form>
        </>
    );
}

export default ReportOutage;