import React, { useState} from "react";
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

    //handles the changes of values that occur on a form.
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData((data) => ({...data, [event.target.name]: event.target.value,}));
    };

    //request to submit a report
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
    };

    return (
        <Container id="report-container" className="w-75">
            <Form onSubmit={handleSubmitReport}>
                <h1 id="report-title" class>Report Outage</h1>
                {JSON.parse(localStorage.getItem("user")) == null
                ? <h3 className="w-50 mx-auto">Please log in</h3>
                :
                <>
                    <Row >
                        <Col className = "m-3 mx-auto">
                            <select className="form-control" placeholder="Select Service Type" selected="Streaming" id="serviceType" name="serviceType" onChange={handleChange} required>
                                <option selected>Select Service Type</option>
                                <option value="Streaming">Streaming</option>
                                <option value="Internet">Internet</option>
                                <option value="Power">Power</option>
                                <option value="Cable">Cable</option>
                                <option value="Gaming Platform">Gaming Platform</option>
                            </select>
                        </Col>
                    </Row>

                    <Row >
                        <Col className = "m-3 mx-auto w-50">
                            <Form.Control type="text" placeholder="Service Name"
                            onChange={handleChange} 
                            value={formData.serviceName}
                            name="serviceName" required/>
                        </Col>
                    </Row>

                    <Row >
                        <Col className = "m-3 mx-auto">
                            <Form.Control type="text" placeholder="Description"
                            onChange={handleChange} 
                            value={formData.serviceDescription}
                            name="serviceDescription" required/>
                        </Col>
                    </Row>

                    <Row className="w-50 mx-auto">
                        <Button 
                        className = "m-4 mx-auto" 
                        type="submit"
                        style={{background: "black", border: "none"}}>
                            Report Outage
                        </Button>
                    </Row>
                </>
                }
            </Form>
        </Container>
    );
}

export default ReportOutage;