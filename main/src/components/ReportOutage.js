import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";

function ReportOutage(){
    //Use state hook to track what values are being inputed into the form as well as
    //setting the default values
    const [formData, setFormData] = useState({
        userReport: '6',
        serviceType: "",
        serviceName: "",
        serviceStreet: "",
        serviceCity: "",
        serviceState: "",
        serviceDescription: ""
    }) 

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData((data) => ({...data, [event.target.name]: event.target.value,}));
    };

    const history = useHistory();

    const handleSubmitReport = async (event) =>{
        event.preventDefault();
        console.log(formData.serviceName); // This is return undefined when I am expecting the service name entered by the user.
        const res = await axios.post("/outage-new", {
            user_id: `${formData.userReport}`,
            service_type: `${formData.serviceType}`,
            service_name: `${formData.serviceName}`,
            outage_street: `${formData.serviceStreet}`,
            outage_city: `${formData.serviceCity}`,
            outage_state: `${formData.serviceState}`,
            outage_description: `${formData.serviceDescription}`,
        })

        history.push('/outages');
    };

    return (
        <>
            <h1 id="Report-Title" class>Test Dialog box</h1>
            <form onSubmit={handleSubmitReport}>
                <input type="text" placeholder="Service Type" 
                onChange={handleChange} //inline function to set formData for the form
                value={formData.serviceType}/*this is where data in the form is read*/
                name="serviceType"/>


                <input type="text" placeholder="Service Name"
                onChange={handleChange} 
                value={formData.serviceName}
                name="serviceName"/>

                <input type="text" placeholder="Street"
                onChange={handleChange} 
                value={formData.serviceStreet}
                name="serviceStreet"/>

                <input type="text" placeholder="City"
                onChange={handleChange} 
                value={formData.serviceCity}
                name="serviceCity"/>

                <input type="text" placeholder="State"
                onChange={handleChange} 
                value={formData.serviceState}
                name="serviceState"/>

                <input type="text" placeholder="Description"
                onChange={handleChange} 
                value={formData.serviceDescription}
                name="serviceDescription"/>

                <button type="submit">Report Outage</button>
            </form>
        </>
    );
}

export default ReportOutage;