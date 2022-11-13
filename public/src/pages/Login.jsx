import React, { useState, useEffect } from "react";
import axios from "axios";
import './login.css'
import { useNavigate, Link } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const nav = useNavigate();
  
  const [values, setValues] = useState({
    username: "",
    password: "",
  
  });


  useEffect(() => {
    if (localStorage.getItem(process.env. REACT_APP_LOCALHOST_KEY)) {
      // nav("/chat"); //Allows instant login, if previously logged in
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
      const {  username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        nav("/chat");
      }
  };
  

  return (
    <div className='StyledContainer'>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="Title">
            <h1>SECURE CHAT</h1>
          </div>
          <input
            name="username"
            placeholder="Username"
            type="text"
            onChange={(e) => handleChange(e)}
          />
    
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
          
          <button type="submit">Login</button>
          <span>
            <Link to="/register">Register</Link>
          </span>
        </form>
    </div>
  )
}

export default Login