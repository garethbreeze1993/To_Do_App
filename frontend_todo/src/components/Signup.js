// import React from "react";
// import {
//   Button,
//   Form,
//   Grid,
//   Header,
//   Message,
//   Segment
// } from "semantic-ui-react";
// import { connect } from "react-redux";
// import { NavLink, Redirect } from "react-router-dom";
// import { authSignup } from "../store/actions/auth";
//
// class RegistrationForm extends React.Component {
//   state = {
//     username: "",
//     email: "",
//     password1: "",
//     password2: ""
//   };
//
//   handleSubmit = e => {
//     e.preventDefault();
//     const { username, email, password1, password2 } = this.state;
//     this.props.signup(username, email, password1, password2);
//   };
//
//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//
//   render() {
//     const { username, email, password1, password2 } = this.state;
//     const { error, loading, token } = this.props;
//     if (token) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <Grid
//         textAlign="center"
//         style={{ height: "100vh" }}
//         verticalAlign="middle"
//       >
//         <Grid.Column style={{ maxWidth: 450 }}>
//           <Header as="h2" color="teal" textAlign="center">
//             Signup to your account
//           </Header>
//           {error && <p>{this.props.error.message}</p>}
//
//           <React.Fragment>
//             <Form size="large" onSubmit={this.handleSubmit}>
//               <Segment stacked>
//                 <Form.Input
//                   onChange={this.handleChange}
//                   value={username}
//                   name="username"
//                   fluid
//                   icon="user"
//                   iconPosition="left"
//                   placeholder="Username"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   value={email}
//                   name="email"
//                   fluid
//                   icon="mail"
//                   iconPosition="left"
//                   placeholder="E-mail address"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   fluid
//                   value={password1}
//                   name="password1"
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Password"
//                   type="password"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   fluid
//                   value={password2}
//                   name="password2"
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Confirm password"
//                   type="password"
//                 />
//
//                 <Button
//                   color="teal"
//                   fluid
//                   size="large"
//                   loading={loading}
//                   disabled={loading}
//                 >
//                   Signup
//                 </Button>
//               </Segment>
//             </Form>
//             <Message>
//               Already have an account? <NavLink to="/login">Login</NavLink>
//             </Message>
//           </React.Fragment>
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//     token: state.auth.token
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     signup: (username, email, password1, password2) =>
//       dispatch(authSignup(username, email, password1, password2))
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RegistrationForm);

import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
