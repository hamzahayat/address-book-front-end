import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql, compose } from 'react-apollo';

// Import Material Ui Componenets
import { Card, CardText } from 'material-ui/Card';
import { TextField, Dialog, RaisedButton } from 'material-ui';

// Import gql Query
import {
  updateContactMutation,
  getAllContactsQuery,
  deleteContactMutation,
} from '../graphql/Contact';

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
      editedContact: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
      },
      errors: {
        emailError: '',
      },
    });
  }

  // Function for when Contaact is Edited
  handleSave = async () => {
    // Declare Variables
    const { firstName, lastName, email } = this.editedContact;
    const { id } = this.props.selectedContact;

    // Make request and retrieve response
    const response = await this.props.updateContact({
      variables: { id, firstName, lastName, email },
      // Refetch GetAllContacts Query
      refetchQueries: [
        {
          query: getAllContactsQuery,
        },
      ],
    });

    // Declare Response Variables
    const { ok, errors, contact } = response.data.updateContact;

    // Close Modal if successful
    if (ok) {
      this.selectedContact = contact;
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

  handleDelete = async () => {
    // Declare Variables
    const { id } = this.props.selectedContact;

    // Make request and retrieve response
    const response = await this.props.deleteContact({
      variables: { id },
      // Refetch GetAllContacts Query
      refetchQueries: [
        {
          query: getAllContactsQuery,
        },
      ],
    });

    // Declare Response Variables
    const { ok, errors } = response.data.deleteContact;

    // Close Modal if successful
    if (ok) {
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
    this.editedContact = this.props.selectedContact;
    this.editedContact[name] = value;
    this.errors.emailError = '';
  };

  render() {
    // Initialize Props
    const {
      errors: { emailError },
    } = this;
    const { firstName, lastName, email } = this.props.selectedContact;
    const { handleModal, modalOpen } = this.props;

    return (
      <Dialog
        contentStyle={style.dialog}
        open={modalOpen}
        actions={[
          <RaisedButton
            style={style.btn}
            label="Delete"
            primary={true}
            onClick={this.handleDelete}
          />,
          <RaisedButton
            style={style.btn}
            label="Save"
            primary={true}
            onClick={this.handleSave}
          />,
        ]}
        onRequestClose={handleModal}
        title={
          <div>
            <h3>Edit Contact</h3>
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
            <TextField
              name="lastName"
              value={lastName}
              onChange={this.onChange}
              floatingLabelText="Last Name"
            />

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
const EditContactWithMutations = compose(
  graphql(updateContactMutation, {
    name: 'updateContact',
  }),
  graphql(deleteContactMutation, {
    name: 'deleteContact',
  }),
)(observer(EditContact));

export default EditContactWithMutations;
