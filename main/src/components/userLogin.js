// login page for users
// author: IW
//second draft of react form
import React, { useEffect } from "react";
import { useHistory, withRouter, Link } from "react-router-dom";
import Modal from "react-modal";
import "../css/login.css";
import axios from "axios";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
} from "react-bootstrap";
import hash from "object-hash";

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
      <div id="login-page">
        <Container className="loginContainer w-50 mw-25">
          <Form onSubmit={this.handleSubmits}>
            <h1 id="title">Login</h1>

            <Row className="m-3 mx-auto w-75">
              <Col /*lg={4} md={6} sm={12}*/>
                <Form.Group controlId="formEmail">
                  <input
                    type="email"
                    name="email"
                    id="username-field"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="m-3 mx-auto w-75">
              <Col /*lg={4} md={6} sm={12}*/>
                <Form.Group controlId="formPassword">
                  <input
                    type="password"
                    name="pwd"
                    id="password-field"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Col className="mx-auto w-25">
              <Row>
                <Button
                  className="customBtn"
                  variant="primary btn-block"
                  type="submit"
                  size="md"
                  style={{ background: "orange", border: "none" }}
                  onSubmit={this.handleSubmits}
                >
                  Log In
                </Button>
              </Row>
            </Col>
          </Form>
          <div className="passwordReset">
            <Link className="resetLink" to="/reset">
              Forgot My Password
            </Link>
          </div>
        </Container>

        {/* <div id="main-holder">
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
        </div> */}
      </div>
    );
  }
}
export default withRouter(UserLogin);
