import React, { Component } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import './App.css';
import {NavbarBrand} from "reactstrap";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }



  // https://stackoverflow.com/questions/1256593/why-am-i-getting-an-options-request-instead-of-a-get-request

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.access);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: ''
        });
      });
  };

//   {
//     "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYxMTUxMjg4MSwianRpIjoiNzk4NzRmZjY3ODdhNDYzZjllMmNjY2JlMzM2YWFkYjIiLCJ1c2VyX2lkIjoxfQ.Wz7R8D_0yTQ6SjXmLHfK7sAMHLGKtIA2wUYJI0pEZBE",
//     "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjExNDI2NzgxLCJqdGkiOiIwNTU5YzliODk2OTQ0ZWQzOWE2NTk2MTIyZTUxMjk1ZSIsInVzZXJfaWQiOjF9.04n136HPjKhRwi49qM2AvwWGc1IZkGDLF-nrCTiwkd0"
// }

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

    loadTasks = () => {
    if (this.state.logged_in) {
      const access_token = 'Bearer ' + localStorage.getItem('token')
      fetch("http://localhost:8000/api/tasks/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token,
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
        })
        .catch(error => console.error(error));
    }
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Navbar
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
        {this.state.logged_in
            ? <button onClick={this.loadTasks}>Load Tasks</button>
            : <p>Please log in to see your tasks</p>}

      </div>
    );
  }
}

export default App;
