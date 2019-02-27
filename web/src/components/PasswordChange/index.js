import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>

          <FormControl margin="normal" required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="passwordOne" name="passwordOne" autoComplete="password" 
          value={passwordOne}
          onChange={this.onChange} autoFocus />
          </FormControl>
          <br/>
          <FormControl margin="normal" required>
            <InputLabel htmlFor="password">Password Two</InputLabel>
            <Input id="passwordTwo" name="passwordTwo" autoComplete="password" 
          value={passwordTwo}
          onChange={this.onChange} autoFocus />
          </FormControl>
       <br/>
        <Button variant='raised' color='primary' disabled={isInvalid} type="submit">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
