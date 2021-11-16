import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";

function ReportOutage(){
    //Use state hook to track what values are being inputed into the form as well as
    //setting the default values
    const [formData, setFormData] = useState({
        serviceType: "",
        serviceName: "",
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
        const res = await axios.post("/outage-new", {
            user_email: `${JSON.parse(localStorage.getItem("user"))}`,
            service_type: `${formData.serviceType}`,
            service_name: `${formData.serviceName}`,
            latitude: localStorage.getItem("latitude"),
            longitude: localStorage.getItem("longitude"),
            outage_description: `${formData.serviceDescription}`,
        })
        window.location.reload();
        history.push('/outages');
    };

    return (
        <>
            <h1 id="Report-Title" class>Test Dialog box</h1>
            {/* {JSON.parse(localStorage.getItem("user")) == null
            ? <h1>please log in</h1>
            : */}
            <form onSubmit={handleSubmitReport}>

                <select selected="Streaming" id="serviceType" name="serviceType" onChange={handleChange} required>
                    <option value="Streaming">Streaming</option>
                    <option value="Internet">Internet</option>
                    <option value="Power">Power</option>
                    <option value="Cable">Cable</option>
                    <option value="Gaming Platform">Gaming Platform</option>
                </select>

                <input type="text" placeholder="Service Name"
                onChange={handleChange} 
                value={formData.serviceName}
                name="serviceName" required/>

                <input type="text" placeholder="Description"
                onChange={handleChange} 
                value={formData.serviceDescription}
                name="serviceDescription" required/>

                <button type="submit">Report Outage</button>
            </form>
            {/* } */}
        </>
    );
}

export default ReportOutage;