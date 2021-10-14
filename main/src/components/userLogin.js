// login page for users
// author: IW
//second draft of react form
import React from 'react';
import {ReactComponent as Logo} from './css/logo.svg';

class Login extends React.Component{
    state={
        email:'',
        pwd:''
    }
    handleChange = (e) =>{
        const{name, value}=e.target
        this.setState({[name]:value})
    }
    
    handleSubmits = (e) =>{
        e.preventDefault()
    }

    return(){
        return(
            <div>
                <div>
                    <Logo/>
                </div>
                <div>
                    <form>
                        <input type='email' name='email' placeholder='email...' onChange={this.handleChange}/>
                        <input type='password' name='pwd' placeholder='password...' onChange={this.handleChange}/>
                        <button onSubmit={this.handleSubmits}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;
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

