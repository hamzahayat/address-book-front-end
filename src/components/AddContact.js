import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';

// Import Material Ui Componenets
import { Card, CardText } from 'material-ui/Card';
import { TextField, Dialog, RaisedButton } from 'material-ui';

// Import gql Query
import { createContactMutation, getAllContactsQuery } from '../graphql/Contact';

// Declare Style
const style = {
  btn: {
    margin: 10,
  },
  dialog: {
    minWidth: '350px',
    width: '25%',
    textAlign: 'center',
  },
};

class EditContact extends Component {
  // Declare Constructor
  constructor(props) {
    super(props);

    // Initialize State
    extendObservable(this, {
      newContact: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
      },
      errors: { emailError: '' },
    });
  }

  handleAddContact = async () => {
    // Declare Variables
    const { firstName, lastName, email } = this.newContact;

    // Make request and retrieve response
    const response = await this.props.mutate({
      variables: { firstName, lastName, email },
      refetchQueries: [
        {
          query: getAllContactsQuery,
        },
      ],
    });

    // Declare Response Variables
    const { ok, errors } = response.data.createContact;

    //  Close Modal If Successful
    if (ok) {
      this.newContact = {
        firstName: '',
        lastName: '',
        email: '',
      };
      this.props.handleModal();
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      // Set state
      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.newContact[name] = value;
    this.errors.emailError = '';
  };

  render() {
    // Initialize Props
    const {
      errors: { emailError },
    } = this;
    const { firstName, lastName, email } = this.newContact;
    const { handleModal, modalOpen } = this.props;

    return (
      <Dialog
        contentStyle={style.dialog}
        open={modalOpen}
        actions={[
          <RaisedButton
            style={style.btn}
            label="Create"
            primary={true}
            onClick={this.handleAddContact}
          />,
        ]}
        onRequestClose={handleModal}
        title={
          <div>
            <h3>Add Contact</h3>
          </div>
        }
      >
        <Card zDepth={0}>
          <CardText>
            <TextField
              name="firstName"
              value={firstName}
              onChange={this.onChange}
              floatingLabelText="First Name"
            />
            <br />
            <TextField
              name="lastName"
              value={lastName}
              onChange={this.onChange}
              floatingLabelText="Last Name"
            />
            <br />
            <TextField
              name="email"
              value={email}
              onChange={this.onChange}
              floatingLabelText="Email"
              errorText={emailError}
            />
            <br />
          </CardText>
        </Card>
      </Dialog>
    );
  }
}

export default graphql(createContactMutation)(observer(EditContact));
