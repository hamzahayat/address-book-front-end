import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';

// Import Componenets
import Contact from '../components/Contact';
import EditContact from '../components/EditContact';
import AddContact from '../components/AddContact';

// Import gql Query
import { getAllContactsQuery } from '../graphql/Contact';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

// Declare Style Variable
const style = {
  fab: {
    marginRight: 20,
  },
};

class Home extends Component {
  // Declare Constructor
  constructor(props) {
    super(props);

    // Initialize State
    extendObservable(this, {
      selectedContact: {
        firstName: '',
        lastName: '',
        email: '',
      },
      editModalOpen: false,
      addModalOpen: false,
    });
  }

  handleClick = contact => {
    this.selectedContact = contact;
    this.handleEditModal();
  };

  handleEditModal = () => {
    this.editModalOpen = !this.editModalOpen;
  };

  handleFABClick = () => {
    this.addModalOpen = !this.addModalOpen;
  };

  render() {
    const { editModalOpen, addModalOpen } = this;

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div>
        <h1 className="title">My Contacts</h1>
        <h3 className="subtitle">
          {`Welcome ${this.props.location.state.userName}`}
        </h3>
        {!this.props.data.loading
          ? this.props.data.getAllContacts.map(contact => (
              <Contact
                key={contact.id}
                contact={contact}
                handleClick={this.handleClick.bind(this, contact)}
              />
            ))
          : null}
        <EditContact
          selectedContact={this.selectedContact}
          modalOpen={editModalOpen}
          handleModal={this.handleEditModal}
        />
        <AddContact
          modalOpen={addModalOpen}
          handleModal={this.handleFABClick}
        />
        <FloatingActionButton
          style={style.fab}
          className="add-contact-btn"
          onClick={this.handleFABClick}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default graphql(getAllContactsQuery)(observer(Home));
