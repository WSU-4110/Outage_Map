// login page for users
// author: IW
import React, {usestate} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login-page.css";

export default function Login() {
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
}

