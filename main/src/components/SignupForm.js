import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import hash from "object-hash";
import "../css/SignupForm.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const hashedPassword = hash(this.state.input.password);
    console.log(hashedPassword);

    if (this.validate()) {
      //console.log(this.state);

      let input = {};
      input["name"] = "";
      input["email"] = "";
      input["password"] = "";
      input["confirm_password"] = "";
      this.setState({ input: input });

      // alert("You have successfully registered");

      const res = await axios.post("/signup", {
        user_email: `${this.state.input.email}`,
        user_password: `${hashedPassword}`,
      });

      if (res.status === 201) {
        this.props.history.push("/login");
      } else console.log(JSON.parse(res.status.message));
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password.";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirm_password"] !== "undefined"
    ) {
      if (input["password"] !== input["confirm_password"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <div id="signup-page">
        <Container className="signupContainer w-25">
          <Form onSubmit={this.handleSubmit}>
            <h1 id="signuptitle">Create an Account</h1>

            <Row className="m-3 mx-auto w-75">
              <Col>
                <Form.Group controlId="formEmail">
                  <input
                    type="text"
                    name="email"
                    value={this.state.input.email}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Email"
                    id="email"
                    required
                  />

                  <div className="text-danger">{this.state.errors.email}</div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="m-3 mx-auto w-75">
              <Col>
                <Form.Group>
                  <input
                    type="password"
                    name="password"
                    value={this.state.input.password}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    required
                  />

                  <div className="text-danger">
                    {this.state.errors.password}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="m-3 mx-auto w-75">
              <Col>
                <Form.Group>
                  <input
                    type="password"
                    name="confirm_password"
                    value={this.state.input.confirm_password}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Confirm Password"
                    id="confirm_password"
                    required
                  />

                  <div className="text-danger">
                    {this.state.errors.confirm_password}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Col className="mx-auto w-25">
              <Row>
                <Button
                  type="submit"
                  value="Register"
                  className="customBtn"
                  variant="primary btn-block"
                  size="md"
                  style={{ background: "orange", border: "none" }}
                >
                  Sign Up
                </Button>
              </Row>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(SignupForm);
