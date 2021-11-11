// login page for users
// author: IW
//second draft of react form
import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Modal from "react-modal";
import "../css/login.css";
import axios from "axios";
<<<<<<< HEAD
import { Container, Form, Row, Col, Button, ToggleButtonGroup} from 'react-bootstrap'
=======
import hash from "object-hash";
>>>>>>> 2b7720a3adf22f0aa45dc40baf34024c213d67c0

class UserLogin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "", //object entry from user
      pwd: "", //object entry from user
      loggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmits = this.handleSubmits.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  async handleSubmits(e) {
    e.preventDefault();
    const hashedPassword = hash(this.state.pwd);
    const res = await axios.post("/login", {
      user_email: `${this.state.email}`,
      user_password: `${hashedPassword}`,
    });

    if (res.status === 200) {
      this.state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(this.state.email));
      this.props.history.push("/outages");
    }
  }

  render() {
    return (
      <div id ="login-page">
        <Container className="loginContainer w-50 mw-75" >
          <Form>
            <Row className = "mx-auto">
              <Col /*lg={4} md={6} sm={12}*/>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email"/>
                  <ToggleButtonGroup
                  type="email"
                  name="email"
                  id="username-field"
                  className="login-form-field"
                  placeholder="Email"
                  onChange={this.handleChange}
                  ></ToggleButtonGroup>
                </Form.Group>
                </Col>
            </Row>
 
            <Row className = "mx-auto">
              <Col /*lg={4} md={6} sm={12}*/>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"/>
                  <ToggleButtonGroup
                  type="password"
                  name="pwd"
                  id="password-field"
                  className="login-form-field"
                  placeholder="Password"
                  onChange={this.handleChange}
                  ></ToggleButtonGroup>
                </Form.Group>
              </Col>
            </Row>

            <Col>
              <Row className = "mx-auto">
                <Button variant="primary btn-block" type="submit" >Login</Button>
              </Row>
            </Col>
          </Form>
        </Container>
        
        <div id="main-holder">
          <form className="login-form" onSubmit={this.handleSubmits}>
            <h1 id="login-header">Log in</h1>
            <div>
              <div id="login-form">
                <input
                  type="email"
                  name="email"
                  id="username-field"
                  className="login-form-field"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="pwd"
                  id="password-field"
                  className="login-form-field"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <div className="login-form-submit">
                  <input
                    type="submit"
                    value="Log in"
                    id="login-submit"
                    onSubmit={this.handleSubmits}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(UserLogin);

//first draft of react form
/*export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    function validateForm(){
        return email.length > 0 && password.length > 0;
    }

    function handleSubmits(event) {
        event.preventDefault();
    }
    
    return (
        <div className="Login">
            <Form onSubmit={handleSubmits}>
                <Form.Group size="lg" controlID="email">
                    <Form.Label>User Email</Form.Label>
                    <Form.Control
                    autoFocus //focus on the field
                    type="email"
                    value={email}
                    onChange={(e) => setPassword (e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlID="password">
                    <Form.Label>User Password</Form.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                  Login  
                </Button>
            </Form>
        </div>
    );
}*/
