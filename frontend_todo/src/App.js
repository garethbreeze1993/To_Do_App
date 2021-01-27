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
      username: '',
      data: [],
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
        localStorage.setItem('refresh', json.refresh)
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: ''
        });
      });
  };

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

  getNewAccessToken = (func_called) => {
    const refresh_token = {'refresh': localStorage.getItem('refresh')}
    fetch('http://localhost:8000/api/token/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(refresh_token)
}).then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.access)
        console.log('THOIS BIT HITS THIS AND KIND OF WORKS')
        // Find way to get function and call it again with new credentials
        this.loadTasks()
      }).catch((err) => {
      console.log('htis error on access token')
      console.error(err)
    })
  }

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
          // console.log(json);
          this.setState({data: json})
        })
        .catch(error => {
          console.error(error)
          if (error.code === "token_not_valid" && error.message[0].message === "Token is invalid or expired"){
            this.getNewAccessToken('loadTasks')
          }
        });
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

        <h2>List of Tasks to do</h2>
        <section>
        { this.state.data
        ? this.state.data.map((task) => {
          const {id, title, description, completed, deadline} = task
          return <div key={id}>
            <p>{title}</p>
            <p>{description}</p>
            {completed ? <p>Completed true</p> : <p>Completed false</p>}
            <p>{deadline}</p>
          </div>
        }):
        <p>No tasks have been created</p>}
        </section>

      </div>
    );
  }
}

export default App;
