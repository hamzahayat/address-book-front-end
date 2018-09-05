import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';

// Import Material Ui Componenets
import { Card, CardActions, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';

// Import gql Query
import { registerMutation } from '../graphql/User';

// Declare Style
const style = {
  card: {
    width: 'calc(100%/4)',
  },
  inputStyle: {
    width: 'calc(100% - 5px)',
  },
};

class Register extends React.Component {
  // Declare Constructor
  constructor(props) {
    super(props);

    // Initialize State
    extendObservable(this, {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      errors: {},
    });
  }

  // Function for when form is submitted
  onSubmit = async () => {
    // Declare Variables
    const { firstName, lastName, email, password } = this;

    // Make request and retrieve response
    const response = await this.props.mutate({
      variables: { firstName, lastName, email, password },
    });

    // Declare Response Variables
    const { ok, errors } = response.data.registerUser;

    // Set Token if Successful login
    if (ok) {
      this.props.history.push({
        pathname: '/',
      });
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        console.log(`Error-Path: ${path}, \nMessage: ${message}`);
        err[`${path}Error`] = message;
      });

      // Set state
      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      errors: { emailError, passwordError },
    } = this;

    return (
      <div>
        <h1 className="title">My Contacts</h1>
        <div className="login-card">
          <Card style={style.card}>
            <CardText>
              <h1 className="title">Login</h1>
              <TextField
                inputStyle={style.inputStyle}
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                hintText="Enter First Name"
                floatingLabelText="First Name"
              />
              <TextField
                inputStyle={style.inputStyle}
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                hintText="Enter Last Name"
                floatingLabelText="Last Name"
              />
              <TextField
                inputStyle={style.inputStyle}
                name="email"
                value={email}
                onChange={this.onChange}
                hintText="Enter Email"
                floatingLabelText="Email"
                errorText={emailError}
              />
              <TextField
                inputStyle={style.inputStyle}
                name="password"
                value={password}
                onChange={this.onChange}
                hintText="Enter Password"
                floatingLabelText="Password"
                type="password"
                errorText={passwordError}
              />
            </CardText>
            <CardActions>
              <RaisedButton
                style={{ margin: 10 }}
                primary
                label="Register"
                onClick={this.onSubmit}
              />
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default graphql(registerMutation)(observer(Register));
