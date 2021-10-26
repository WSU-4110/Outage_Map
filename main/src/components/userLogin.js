// login page for users
// author: IW
//second draft of react form
import React from 'react';
import "../css/login.css";
//import axios from "axios";

class UserLogin extends React.Component{
    constructor(){
        super();

        this.state={
            email:'', //object entry from user
            pwd:'' //object entry from user
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmits=this.handleSubmits.bind(this);

    }
    
    handleChange = (e) =>{
        const{name, value}=e.target
        this.setState({[name]:value})
    }
    
    handleSubmits = (e) =>{        
        e.preventDefault();
        console.log("Form submitted with the following data");
        console.log(this.state);
    }

    render(){
        return(
            <div>
                <div id="main-holder">
                    <form className="login-form" onSubmit={this.handleSubmits}>
                        <h1 id="login-header">Login</h1>
                        <div>
                            <form id ="login-form">
                                <input type='email' name='email' id="username-field" class="login-form-field" placeholder='email...' onChange={this.handleChange}/>
                                <input type='password' name='pwd' id="password-field" class="login-form-field" placeholder='password...' onChange={this.handleChange}/>
                                <div className="login-form-submit">
                                    <button onSubmit={this.handleSubmits}>Login</button>
                                </div>
                            </form>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default UserLogin;
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
