import React from 'react'
class SignupForm extends React.Component { 
    constructor(props){ 
        super(props);
        this.state = {value: '', value2: '',value3: '', errorMsg: ''}; //value == email input, value2 == password input, value 3 == confirm password input

        this.handleChange = this.handleChange.bind(this); //email
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange2 = this.handleChange2.bind(this); //password
        this.handleChange3 = this.handleChange3.bind(this); //confirm password
    }

    handleChange(event){
        this.setState({value: event.target.value});        
    }
    handleChange2(event){
      this.setState({value2: event.target.value2});
    }
    handleChange3(event){
      this.setState({value3: event.target.value3});
    }


    handleSubmit(event){
      if (this.state.value2 !== '' && this.state.value3 !== ''){
        if(this.state.value2 !== this.state.value3)
        {
          alert("passwords do not match");
        }
        else if(this.state.value2 === this.state.value3)
        {
          alert(this.state.value + " has registered")
        }
      }

      /*if( this.state.value2 !== '' && this.state.value3 !== '')
      {
        if (this.state.value2 !== this.state.value3)
        {
          this.state.errorMsg = "passwords do not match";
        }
      }
      else
      this.state.errorMsg = this.state.value + "has registered";
      event.preventDefault();*/
    
      /*if(typeof this.state.value2 !== "undefined" && typeof this.state.value3 !== "undefined")


        //if(this.state.value2 !== '' && this.state.value3 !== '')
        {
          if(this.state.value2!= this.state.value3)
          {
            //this.setState({errorMsg: "Passwords dont match"});
          this.state.errorMsg = "Passwords dont match";
          }
        //else if(this.state.value2 == this.state.value3 )
          //this.state.errorMsg= this.state.value + ' has registered';
        event.preventDefault();
        }*/
      }

    render() {
        return (
          <div id = "Signup-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:     
              <input type="text" value={this.state.value} onChange={this.handleChange} /> <t></t><br></ br>
              Password:
              <input type="password" value={this.state.value2} onChange={this.handleChange2} /> <br></br>
              Confirm Password:
              <input type="password" value={this.state.value3} onChange={this.handleChange3} /> 
            </label>
            <input type="submit" value="Submit"/>
          </form>
          </div>
        );
      }
    }

export default SignupForm;