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
// import { authLogin } from "../store/actions/auth";
//
// class LoginForm extends React.Component {
//   state = {
//     username: "",
//     password: ""
//   };
//
//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//
//   handleSubmit = e => {
//     e.preventDefault();
//     const { username, password } = this.state;
//     this.props.login(username, password);
//   };
//
//   render() {
//     const { error, loading, token } = this.props;
//     const { username, password } = this.state;
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
//             Log-in to your account
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
//                   fluid
//                   value={password}
//                   name="password"
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Password"
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
//                   Login
//                 </Button>
//               </Segment>
//             </Form>
//             <Message>
//               New to us? <NavLink to="/signup">Sign Up</NavLink>
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
//     login: (username, password) => dispatch(authLogin(username, password))
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginForm);

import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
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
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <h4>Log In</h4>
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

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};