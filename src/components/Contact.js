import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

// Import Material Ui Componenets
import { Paper, Avatar } from 'material-ui';

// Declare Styles
const style = {
  paper: {
    height: 100,
    width: 100,
    margin: 20,
    display: 'inline-block',
    cursor: 'pointer',
  },
  avatar: {
    height: 100,
    width: 100,
    textAlign: 'center',
  },
};

class Contact extends Component {
  // Declare Constructor
  constructor(props) {
    super(props);

    // Initialize State
    extendObservable(this, {});
  }

  render() {
    // Initialize Props
    const { firstName, lastName } = this.props.contact;
    const { handleClick } = this.props;
    return (
      <div className="contact-card">
        <Paper
          onClick={handleClick}
          style={style.paper}
          circle={true}
          zDepth={1}
        >
          <Avatar size={100}>{firstName.charAt(0)} </Avatar>
          <h3 className="contact-card-name">{`${firstName} ${lastName}`}</h3>
        </Paper>
      </div>
    );
  }
}

export default observer(Contact);
