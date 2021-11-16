import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

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
        console.log(localStorage.getItem("longitude"));
        const res = await axios.post("/outage-new", {
            user_email: `${JSON.parse(localStorage.getItem("user"))}`,
            service_type: `${formData.serviceType}`,
            service_name: `${formData.serviceName}`,
            latitude: localStorage.getItem("latitude"),
            longitude: localStorage.getItem("longitude"),
            outage_description: `${formData.serviceDescription}`,
        })

        history.push('/outages');
    };

    return (
        <Container className="w-25">
            <Form>
                <h1 id="Report-Title" class>Report Outage</h1>

                    <Row className = "m-3 mx-auto">
                        <Col>
                            <select selected="Streaming" id="serviceType" name="serviceType" onChange={handleChange} required>
                                <option value="Streaming">Streaming</option>
                                <option value="Internet">Internet</option>
                                <option value="Power">Power</option>
                                <option value="Cable">Cable</option>
                                <option value="Gaming Platform">Gaming Platform</option>
                            </select>
                        </Col>
                    </Row>

                    <Row className = "m-3 mx-auto">
                        <Col>
                            <input type="text" placeholder="Service Name"
                            onChange={handleChange} 
                            value={formData.serviceName}
                            name="serviceName" required/>
                        </Col>
                    </Row>

                    <Row className = "m-3 mx-auto">
                        <Col>
                            <input type="text" placeholder="Description"
                            onChange={handleChange} 
                            value={formData.serviceDescription}
                            name="serviceDescription" required/>
                        </Col>
                    </Row>

                    <Button type="submit">Report Outage</Button>
            </Form>
        </Container>

        // <h1 id="Report-Title" class>Test Dialog box</h1>
        // <form onSubmit={handleSubmitReport}>

        //     <select selected="Streaming" id="serviceType" name="serviceType" onChange={handleChange} required>
        //         <option value="Streaming">Streaming</option>
        //         <option value="Internet">Internet</option>
        //         <option value="Power">Power</option>
        //         <option value="Cable">Cable</option>
        //         <option value="Gaming Platform">Gaming Platform</option>
        //     </select>

        //     <input type="text" placeholder="Service Name"
        //     onChange={handleChange} 
        //     value={formData.serviceName}
        //     name="serviceName" required/>

        //     <input type="text" placeholder="Description"
        //     onChange={handleChange} 
        //     value={formData.serviceDescription}
        //     name="serviceDescription" required/>

        //     <Button type="submit">Report Outage</Button>
        // </form>
    );
}

export default ReportOutage;