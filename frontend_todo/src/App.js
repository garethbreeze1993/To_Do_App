import React, {useState} from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';
import './App.css';
// import useJWTCheckExpire from "./hooks/useJWTExpireCheck";
// import {NavbarBrand} from "reactstrap";
// import axios from "axios";
import {useJwt} from "react-jwt";

const App = () => {

    const [displayed_form, setDisplayed_Form] = useState('')
    const [logged_in, setLogged_In] = useState(localStorage.getItem('token') ? true : false)
    const[username, setUserName] = useState('')
    const [data, setData] = useState([])
    let [form, setForm] = useState(null);

    const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'))
    // console.log('render')
    // console.log(decodedToken)
    // console.log(isExpired)


function sleep(milliseconds) {
        console.log('sleepy sleepy')
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

  // https://stackoverflow.com/questions/1256593/why-am-i-getting-an-options-request-instead-of-a-get-request

  const handle_login = (e, data) => {
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
        // this.setState({
        //   logged_in: true,
        //   displayed_form: '',
        //   username: ''
        // });
          setLogged_In(true);
            setDisplayed_Form('');
            setUserName('');
      });
  };

  const handle_signup = (e, data) => {
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
          setLogged_In(true);
            setDisplayed_Form('');
            setUserName('');
     });
  };

  const handle_logout = () => {
    localStorage.removeItem('token');
    setLogged_In(false);
    setUserName('');
  };

  const display_form = form => {
    setDisplayed_Form(form);
  };

  const getNewAccessToken = () => {
    const refresh_token = {'refresh': localStorage.getItem('refresh')}
    console.log('get new access token')
    fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(refresh_token)
}).then(res => res.json())
      .then(json => {
          localStorage.removeItem('token');
        localStorage.setItem('token', json.access)
          console.log('finish getting new access token')
      }).catch((err) => {
      console.log('htis error on access token')
      console.error(err)
    })
  }

  const Tasks = () => {
    if (logged_in) {
        const dateNow = new Date();
        const time = dateNow.getTime()
        console.log(time)
        const exp = decodedToken.exp
        console.log(exp * 1000)
        let usesleep = false

        if(exp * 1000 < time){
            console.log('expired')
            usesleep = true;
            getNewAccessToken();
        }else{
            console.log('not expired hoorayt')
        }

        const access_token = 'Bearer ' + localStorage.getItem('token')


        console.log('getting tasks')
        if(usesleep === true){
            sleep(5000)
            console.log('aqake')
        }
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
            setData(json)
        })
        .catch(error => console.error(error));
    }
  };
        // console.log('ksksks');
        // console.log(displayed_form);
    switch (displayed_form) {
      case 'login':
       form = <LoginForm handle_login={handle_login} />
        break;
      case 'signup':
        form = <SignupForm handle_signup={handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Navbar
          logged_in={logged_in}
          display_form={display_form}
          handle_logout={handle_logout}
        />

        {form}
        <h3>
          {logged_in
            ? `Hello, ${username}`
            : 'Please Log In'}
        </h3>
        {logged_in
            ? <button onClick={Tasks}>Load Tasks</button>
            : <p>Please log in to see your tasks</p>}

        <h2>List of Tasks to do</h2>
        <section>
        { data.length
        ? data.map((task) => {
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

export default App;
